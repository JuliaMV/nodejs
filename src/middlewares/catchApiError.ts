import { NextFunction, Response } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';
import { ApiError } from '../errors';

export const catchApiError = <TReq>(fn: ApiHandler<TReq>) => async (req: TReq, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    const { status: errStatus, message } = err as ApiError;
    if (errStatus) {
      res.status(errStatus).send(message);
    } else {
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
  }
};
