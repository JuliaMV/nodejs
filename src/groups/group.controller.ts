import { Request } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';
import { GroupInput, GroupParams } from './types';

import GroupService from './group.service';

const getAll: ApiHandler<Request> = async (req, res) => {
  const result = await GroupService.getAll();
  res.status(status.OK).json(result);
};

const createItem: ApiHandler<Request<unknown, unknown, GroupInput>> = async (req, res) => {
  const { body } = req;
  const result = await GroupService.create(body);
  res.status(status.OK).json(result);
};

const getById: ApiHandler<Request<GroupParams>> = async (req, res) => {
  const { id } = req.params;
  const result = await GroupService.getById(id);
  res.status(status.OK).json(result);
};

const updateItem: ApiHandler<Request<GroupParams, unknown, GroupInput>> = async (req, res) => {
  const { params: { id }, body } = req;
  const result = await GroupService.update(id, body);
  res.status(status.OK).json(result);
};

const removeItem: ApiHandler<Request<GroupParams>> = async (req, res) => {
  const { id } = req.params;
  const result = await GroupService.deleteById(id);
  res.status(status.OK).json(result);
};

export default {
  getAll,
  createItem,
  getById,
  updateItem,
  removeItem,
};
