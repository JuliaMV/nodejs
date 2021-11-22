import { Router, Request } from 'express';

import { catchApiError, validateSchema } from '../middlewares';

import {
  AssociateUsers,
  AutoSuggestedUsersQuery, User, UserInput, UserParams,
} from './types';

import UserSchema from './user.schema';
import UserController from './user.controller';

const UsersRouter = Router()
  .get('/',
    catchApiError<Request<unknown, unknown, unknown, AutoSuggestedUsersQuery>>(UserController.getAutoSuggestUsers))
  .post('/',
    validateSchema<User>(UserSchema),
    catchApiError<Request<unknown, unknown, UserInput>>(UserController.createItem))
  .get('/:id',
    catchApiError<Request<UserParams>>(UserController.getById))
  .put('/:id',
    validateSchema<User>(UserSchema),
    catchApiError<Request<UserParams, unknown, UserInput>>(UserController.updateItem))
  .delete(
    '/:id',
    catchApiError<Request<UserParams>>(UserController.removeItem),
  )
  .post('/associate',
    catchApiError<Request<unknown, unknown, AssociateUsers>>(UserController.addUsersToGroup));

export default UsersRouter;
