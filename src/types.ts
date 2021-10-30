import { NextFunction, Response } from 'express';

export type ApiHandler<TReq> = (req: TReq, res: Response, next?: NextFunction) => Promise<void>;
