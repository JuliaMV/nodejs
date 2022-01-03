import { Request, Response } from 'express';
import { mock, mockReset } from 'jest-mock-extended';

import GroupController from '../src/groups/group.controller';
import GroupService from '../src/groups/group.service';
import {Group, GroupParams, Permission} from '../src/groups/types';

describe('Test Groups controller', () => {
  const res = mock<Response>();
  const serviceMock = mock<GroupService>();
  const controller = new GroupController(serviceMock);

  const payload = { name: 'guest', permissions: ['READ'] as Permission[] };
  const groupMock: Group = {
    ...payload, id: 'group1',
  };

  beforeEach(() => {
    res.status.mockReturnThis();
  });

  afterEach(() => {
    mockReset(res);
  });

  test('getAll method should return groups', async () => {
    const req = mock<Request>();
    serviceMock.getAll.mockResolvedValue([groupMock]);
    await controller.getAll(req, res);
    expect(res.json).toHaveBeenCalledWith([groupMock]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('createItem method should create new group', async () => {
    const req = mock<Request>({ body: payload});
    serviceMock.create.mockResolvedValue(groupMock);
    await controller.createItem(req, res);
    expect(res.json).toHaveBeenCalledWith(groupMock);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('getById method should return group item', async () => {
    const req = mock<Request>({ params: { id: 'group1'}});
    serviceMock.getById.mockResolvedValue(groupMock);
    await controller.getById(req, res);
    expect(res.json).toHaveBeenCalledWith(groupMock);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('updateItem method should update group and return it', async () => {
    const payloadUpdate = { name: 'new name' };
    const updatedGroup = { ...groupMock, ...payloadUpdate };
    const req = mock<Request>({ params: { id: 'group1'}});
    serviceMock.update.mockResolvedValue(updatedGroup);
    await controller.updateItem(req, res);
    expect(res.json).toHaveBeenCalledWith(updatedGroup);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('removeItem method should delete group', async () => {
    const req = mock<Request>({ params: { id: 'group1'}});
    serviceMock.deleteById.mockResolvedValue(groupMock);
    await controller.removeItem(req, res);
    expect(res.json).toHaveBeenCalledWith(groupMock);
    expect(res.status).toHaveBeenCalledWith(200);
  });

});
