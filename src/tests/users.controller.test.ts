import { Request, Response } from 'express';
import { mock, mockReset } from 'jest-mock-extended';

import UserController from '../users/user.controller';
import UserService from '../users/user.service';
import { User } from '../users/types';

describe('Test Users controller', () => {
  const res = mock<Response>();
  const serviceMock = mock<UserService>();
  const controller = new UserController(serviceMock);

  const payload = { login: 'guest', age: 30, password: 'abc' };
  const userMock: User = {
    ...payload, id: 'test1', createdAt: new Date(), updatedAt: null, deletedAt: null,
  };

  beforeEach(() => {
    res.status.mockReturnThis();
  });

  afterEach(() => {
    mockReset(res);
  });

  test('createItem method should create new user', async () => {
    const req = mock<Request>({ body: payload });
    serviceMock.create.mockResolvedValue(userMock);
    await controller.createItem(req, res);
    expect(res.json).toHaveBeenCalledWith(userMock);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('getById method should return user', async () => {
    const req = mock<Request>({ params: { id: 'test1' } });
    serviceMock.getById.mockResolvedValue(userMock);
    await controller.getById(req, res);
    expect(res.json).toHaveBeenCalledWith(userMock);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('updateItem method should update user and return it', async () => {
    const payloadUpdate = { login: 'super admin', age: 40 };
    const req = mock<Request>({ params: { id: 'test1' }, body: payloadUpdate });
    const updatedUser = { ...userMock, ...payloadUpdate };
    serviceMock.update.mockResolvedValue(updatedUser);
    await controller.updateItem(req, res);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('removeItem method should delete user', async () => {
    const req = mock<Request>({ params: { id: 'test1' } });
    serviceMock.deleteById.mockResolvedValue(userMock);
    await controller.removeItem(req, res);
    expect(res.json).toHaveBeenCalledWith(userMock);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('getAutoSuggestUsers method should return users list', async () => {
    const req = mock<Request>({ query: { limit: '3', loginSubstring: 'a' } });
    serviceMock.getAutoSuggestUsers.mockResolvedValue([userMock]);
    await controller.getAutoSuggestUsers(req, res);
    expect(res.json).toHaveBeenCalledWith([userMock]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('addUsersToGroup method should assign user to group', async () => {
    const payloadAssign = { userIds: ['test1'], groupId: 'group1' };
    const req = mock<Request>({ body: payloadAssign });
    await controller.addUsersToGroup(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
