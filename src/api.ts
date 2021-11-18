import { Router } from 'express';
import UsersRouter from './users/user.router';

export const apiRouter = Router()
  .use('/users', UsersRouter);
