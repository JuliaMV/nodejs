import { Request } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';
import { AutoSuggestedUsersQuery, UserParams, UserInput } from './types';

import UserService from './user.service';

const getAutoSuggestUsers: ApiHandler<Request<unknown, unknown, unknown, AutoSuggestedUsersQuery>> = async (req, res) => {
  const { limit, loginSubstring } = req.query;
  const result = await UserService.getAutoSuggestUsers(loginSubstring, limit);
  res.status(status.OK).json(result);
};

const createItem: ApiHandler<Request<unknown, unknown, UserInput>> = async (req, res) => {
  const { body } = req;
  const result = await UserService.create(body);
  res.status(status.OK).json(result);
};

const getById: ApiHandler<Request<UserParams>> = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.getById(id);
  res.status(status.OK).json(result);
};

const updateItem: ApiHandler<Request<UserParams, unknown, UserInput>> = async (req, res) => {
  const { params: { id }, body } = req;
  const result = await UserService.update(id, body);
  res.status(status.OK).json(result);
};

const removeItem: ApiHandler<Request<UserParams>> = async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteById(id);
  res.status(status.OK).json(result);
};

export default {
  getAutoSuggestUsers,
  createItem,
  getById,
  updateItem,
  removeItem,
};
