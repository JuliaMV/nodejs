import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')?.[1];
    if (token) {
      jwt.verify(token, process.env.SECRET as string);
      next();
    } else {
      res.status(status.UNAUTHORIZED).json('Access denied');
    }
  } catch {
    res.status(status.FORBIDDEN).json('Access denied');
  }
};
