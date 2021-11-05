import { Router } from 'express';
import { usersRouter } from './users/users.router';

export const apiRouter = Router()
  .use('/users', usersRouter);
