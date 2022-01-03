import { Request, Response } from 'express';
import status from 'http-status';

import {
  UserInput, AssociateUsers,
} from './types';

import UserService from './user.service';

class UserController {
  private userService: UserService;

  constructor(service: UserService) {
    this.userService = service;
  }

  async getAutoSuggestUsers(req: Request, res: Response) {
    // TODO: add validation for query params
    const {
      limit,
      loginSubstring,
    } = req.query;
    const result = await this.userService.getAutoSuggestUsers(loginSubstring as string, Number(limit));
    res.status(status.OK)
      .json(result);
  }

  async createItem(req: Request<unknown, unknown, UserInput>, res: Response) {
    const { body } = req;
    const result = await this.userService.create(body);
    res.status(status.OK)
      .json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.userService.getById(id);
    res.status(status.OK)
      .json(result);
  }

  async updateItem(req: Request, res: Response) {
    const {
      params: { id },
      body,
    } = req;
    const result = await this.userService.update(id, body);
    res.status(status.OK)
      .json(result);
  }

  async removeItem(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.userService.deleteById(id);
    res.status(status.OK)
      .json(result);
  }

  async addUsersToGroup(req: Request<unknown, unknown, AssociateUsers>, res: Response) {
    // TODO: add validation
    const {
      body: {
        userIds,
        groupId,
      },
    } = req;
    const result = await this.userService.addUsersToGroup(userIds, groupId);
    res.status(status.OK)
      .json(result);
  }
}

export default UserController;
