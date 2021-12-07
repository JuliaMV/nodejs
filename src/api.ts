import { Router } from 'express';
import UsersRouter from './users/user.router';
import GroupsRouter from './groups/group.router';

export const apiRouter = Router()
  .use('/users', UsersRouter)
  .use('/groups', GroupsRouter);
