import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import status from 'http-status';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('!!!!!!!TOKEN', token);
    const result = jwt.verify(token, process.env.SECRET);
    console.log('RESULT', result);
    next();
  } catch {
    res.status(status.UNAUTHORIZED).json('Access denied');
  }
};
