import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';
import { ApiError } from '../errors';
import logger from '../logger';

export const catchApiError = <TReq>(fn: ApiHandler<TReq>) => async (req: TReq, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    const { status: errStatus, message } = err as ApiError;
    if (errStatus) {
      res.status(errStatus).send(message);
    } else {
      const {
        method, originalUrl, params, body,
      } = req as unknown as Request;
      logger.log('error', `Unhandled API Error at ${method} ${originalUrl} with params ${JSON.stringify(params)} ${JSON.stringify(body)}, message "${(err as unknown as Error).message}"`);
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
  }
};
