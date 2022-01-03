import { Request, Response } from 'express';
import status from 'http-status';

import { GroupInput, GroupParams } from './types';

import GroupService from './group.service';

class GroupController {
  private groupService: GroupService;

  constructor(service: GroupService) {
    this.groupService = service;
  }

  async getAll(req: Request, res: Response) {
    const result = await this.groupService.getAll();
    res.status(status.OK)
      .json(result);
  };

  async createItem(req: Request<unknown, unknown, GroupInput>, res: Response) {
    const {body} = req;
    const result = await this.groupService.create(body);
    res.status(status.OK)
      .json(result);
  };

  async getById(req: Request, res: Response) {
    const {id} = req.params;
    const result = await this.groupService.getById(id);
    res.status(status.OK)
      .json(result);
  };

  async updateItem(req: Request, res: Response) {
    const {
      params: {id},
      body
    } = req;
    const result = await this.groupService.update(id, body);
    res.status(status.OK)
      .json(result);
  };

  async removeItem (req: Request, res: Response) {
    const {id} = req.params;
    const result = await this.groupService.deleteById(id);
    res.status(status.OK)
      .json(result);
  };
}

export default GroupController;
