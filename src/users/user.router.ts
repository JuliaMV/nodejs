import { Router, Request } from 'express';

import { catchApiError, validateSchema } from '../middlewares';

import {
  AssociateUsers, User, UserInput, UserParams,
} from './types';

import UserSchema from './user.schema';
import UserController from './user.controller';
import UserService from './user.service';

const service = new UserService();
const controller = new UserController(service);

const UsersRouter = Router()
  .get('/',
    catchApiError<Request>(controller.getAutoSuggestUsers))
  .post('/',
    validateSchema<User>(UserSchema),
    catchApiError<Request<unknown, unknown, UserInput>>(controller.createItem))
  .get('/:id',
    catchApiError<Request<UserParams>>(controller.getById))
  .put('/:id',
    validateSchema<User>(UserSchema),
    catchApiError<Request<UserParams, unknown, UserInput>>(controller.updateItem))
  .delete(
    '/:id',
    catchApiError<Request<UserParams>>(controller.removeItem),
  )
  .post('/associate',
    catchApiError<Request<unknown, unknown, AssociateUsers>>(controller.addUsersToGroup));

export default UsersRouter;
