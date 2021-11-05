import { Schema, ValidationErrorItem } from 'joi';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

type ValidationApiErrorItem = Pick<ValidationErrorItem, 'path' | 'message'>;

type ValidationApiError = {
  status: 'failed',
  errors: ValidationApiErrorItem[];
};

export const errorResponse = (schemaErrors: ValidationErrorItem[]): ValidationApiError => {
  const errors: ValidationApiErrorItem[] = schemaErrors.map(({ path, message }) => ({ path, message }));
  return {
    status: 'failed',
    errors,
  };
};

export const validateSchema = <TBody>(schema: Schema) => (req: Request<unknown, unknown, TBody>, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });
  if (error && error.isJoi) {
    res.status(status.BAD_REQUEST).json(errorResponse(error.details));
  } else {
    next();
  }
};
