import { InternalError, ResourceNotFoundError } from '../errors';

import { GroupInput, GroupOutput } from './types';

import GroupModel from './group.model';
import UserGroupModel from '../associations/user-group.model';

const create = async (payload: GroupInput): Promise<GroupOutput> => {
  try {
    const group = await GroupModel.create({ ...payload });
    return group.get();
  } catch (err) {
    throw new InternalError();
  }
};

const findModel = async (id: string): Promise<GroupModel | never> => {
  let group: GroupModel | null;
  try {
    group = await GroupModel.findByPk(id);
  } catch (err) {
    throw new InternalError();
  }
  if (!group) {
    throw new ResourceNotFoundError('group');
  }
  return group;
};

const update = async (id: string, payload: Partial<GroupInput>): Promise<GroupOutput> => {
  const group: GroupModel = await findModel(id);
  try {
    await group.update(payload);
  } catch (err) {
    throw new InternalError();
  }
  return group.get();
};

const getById = async (id: string): Promise<GroupOutput | never> => {
  const group: GroupModel = await findModel(id);
  return group.get();
};

const deleteById = async (id: string): Promise<GroupOutput | never> => {
  const group: GroupModel = await findModel(id);
  try {
    await UserGroupModel.destroy({
      where: {
        groupId: id,
      },
    });
    await group.destroy();
  } catch (err) {
    throw new InternalError();
  }
  return group.get();
};

const getAll = async (): Promise<GroupOutput[] | never> => {
  try {
    const items = await GroupModel.findAll({
      raw: true,
    });
    return items;
  } catch (err) {
    throw new InternalError();
  }
};

export default {
  getAll,
  create,
  update,
  getById,
  deleteById,
};
