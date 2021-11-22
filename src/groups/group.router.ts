import { Router, Request } from 'express';

import { catchApiError } from '../middlewares';

import GroupController from './group.controller';
import { GroupInput, GroupParams } from './types';

const GroupRouter = Router()
  .get('/',
    catchApiError<Request>(GroupController.getAll))
  .post('/',
    catchApiError<Request<unknown, unknown, GroupInput>>(GroupController.createItem))
  .get('/:id',
    catchApiError<Request<GroupParams>>(GroupController.getById))
  .put('/:id',
    catchApiError<Request<GroupParams, unknown, GroupInput>>(GroupController.updateItem))
  .delete('/:id',
    catchApiError<Request<GroupParams>>(GroupController.removeItem));

export default GroupRouter;
