import { hrtime } from 'process';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';
import { ApiError } from '../errors';
import logger from '../logger';

export const catchApiError = <TReq>(fn: ApiHandler<TReq>) => async (req: TReq, res: Response, next: NextFunction) => {
  const {
    method, originalUrl, params, body,
  } = req as unknown as Request;
  const startTime = hrtime.bigint();
  try {
    await fn(req, res, next);
    const endTime = hrtime.bigint();
    logger.log('info', `Benchmark for ${method} ${originalUrl} took ${endTime - startTime} nanoseconds`);
  } catch (err) {
    const endTime = hrtime.bigint();
    logger.log('info', `Benchmark for ${method} ${originalUrl} took ${endTime - startTime} nanoseconds`);
    const { status: errStatus, message } = err as ApiError;
    if (errStatus) {
      res.status(errStatus).send(message);
    } else {
      logger.log(
        'error',
        // eslint-disable-next-line max-len
        `Unhandled API Error at ${method} ${originalUrl} with params ${JSON.stringify(params)} ${JSON.stringify(body)}, message "${(err as unknown as Error).message}"`,
      );
      res.sendStatus(status.INTERNAL_SERVER_ERROR);
    }
  }
};
