import { NextFunction, Request, Response } from 'express';

export const logRequestInfo = ({ originalUrl, params, body }: Request, res: Response, next: NextFunction) => {
  console.log(`INFO: request url ${originalUrl} params ${JSON.stringify(params)} body ${JSON.stringify(body)}`);
  next();
};
