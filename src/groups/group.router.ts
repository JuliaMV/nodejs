import { Router, Request } from 'express';

import { catchApiError } from '../middlewares';

import GroupController from './group.controller';
import { GroupInput, GroupParams } from './types';
import GroupService from "./group.service";

const service = new GroupService();
const controller = new GroupController(service);

const GroupRouter = Router()
  .get('/',
    catchApiError<Request>(controller.getAll))
  .post('/',
    catchApiError<Request<unknown, unknown, GroupInput>>(controller.createItem))
  .get('/:id',
    catchApiError<Request<GroupParams>>(controller.getById))
  .put('/:id',
    catchApiError<Request<GroupParams, unknown, GroupInput>>(controller.updateItem))
  .delete('/:id',
    catchApiError<Request<GroupParams>>(controller.removeItem));

export default GroupRouter;
