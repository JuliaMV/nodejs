import {
  Router, Request,
} from 'express';
import status from 'http-status';

import UsersService from './users.service';
import { catchApiError, validateSchema } from '../middlewares';

import { UserDto } from './types';
import { ApiHandler } from '../types';
import { userSchema } from './users.schema';

interface AutoSuggestedUsersQuery {
  limit: number;
  loginSubstring: string;
}

interface UserParams {
  id: string;
}

const getAutoSuggestUsers: ApiHandler<Request<unknown, unknown, unknown, AutoSuggestedUsersQuery>> = async (req, res) => {
  const { limit, loginSubstring } = req.query;
  const result = UsersService.getAutoSuggestUsers(loginSubstring, limit);
  res.status(status.OK).json(result);
};

const createItem: ApiHandler<Request<unknown, unknown, UserDto>> = async (req, res) => {
  const { body } = req;
  const result = UsersService.create(body);
  res.status(status.OK).json(result);
};

const getById: ApiHandler<Request<UserParams>> = async (req, res) => {
  const { id } = req.params;
  const result = UsersService.getById(id);
  res.status(status.OK).json(result);
};

const updateItem: ApiHandler<Request<UserParams, unknown, UserDto>> = async (req, res) => {
  const { params: { id }, body } = req;
  const result = UsersService.update(id, body);
  res.status(status.OK).json(result);
};

const removeItem: ApiHandler<Request<UserParams>> = async (req, res) => {
  const { id } = req.params;
  const result = UsersService.softDelete(id);
  res.status(status.OK).json(result);
};

export const usersRouter = Router()
  .get('/',
    catchApiError<Request<unknown, unknown, unknown, AutoSuggestedUsersQuery>>(getAutoSuggestUsers))
  .post('/',
    validateSchema<Request<unknown, unknown, UserDto>>(userSchema),
    catchApiError<Request<unknown, unknown, UserDto>>(createItem))
  .get('/:id',
    catchApiError<Request<UserParams>>(getById))
  .put('/:id',
    validateSchema<Request<unknown, unknown, UserDto>>(userSchema),
    catchApiError<Request<UserParams, unknown, UserDto>>(updateItem))
  .delete(
    '/:id',
    catchApiError<Request<UserParams>>(removeItem),
  );

// Add server-side validation for create/update operations of User entity:
// •all fields are required;
// •login validation is required;
// •password must contain letters and numbers;
// In case of any property does not meet the validation requirements or the field is absent,
// return 400 (Bad Request) and detailed error message.
