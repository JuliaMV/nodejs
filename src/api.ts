import { Router } from 'express';
import UsersRouter from './users/user.router';
import GroupsRouter from './groups/group.router';
import LoginRouter from './login/login.router';
import { checkAuth } from 'middlewares';

export const apiRouter = Router()
  .use('/users', checkAuth, UsersRouter)
  .use('/groups', checkAuth, GroupsRouter)
  .use('/login', LoginRouter);
