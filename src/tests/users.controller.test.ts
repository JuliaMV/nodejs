import { Request, Response } from 'express';
import {mock, mockReset} from 'jest-mock-extended';

import { createItem } from '../users/user.controller';
import UserService from '../users/user.service';


describe('Test Users controller', () => {
  const UserServiceMock = mock<typeof UserService>();
  const res = mock<Response>();

  beforeEach(() => {
    res.status.mockReturnThis();
  });

  afterEach(() => {
    mockReset(res);
  });

  test('createItem method should create new user', async () => {
    const payload = {  login: 'guest', age: 30, password: 'abc' };
    const userMock = {...payload, id: 't1', createdAt: new Date(), updatedAt: null, deletedAt: null };
    const req = mock<Request>({ body: payload });
    UserServiceMock.create.mockResolvedValue(userMock);
    await createItem(req, res);
    expect(res.json).toHaveBeenCalledWith(userMock);
  });

  test('test check', () => {
    expect(true).toBeTruthy();
  })
});
