import { UserInput, UserOutput } from './types';
import { InternalError, ResourceNotFoundError } from '../errors';

import UserModel from './user.model';

const create = async (payload: UserInput): Promise<UserOutput> => {
  try {
    const user = await UserModel.create({ ...payload, createdAt: new Date() }, { silent: true });
    return user.get();
  } catch (err) {
    throw new InternalError();
  }
};

const findModel = async (id: string): Promise<UserModel | never> => {
  let user: UserModel | null;
  try {
    user = await UserModel.findByPk(id);
  } catch (err) {
    throw new InternalError();
  }
  if (!user) {
    throw new ResourceNotFoundError('user');
  }
  return user;
};

const update = async (id: string, payload: Partial<UserInput>): Promise<UserOutput> => {
  const user: UserModel = await findModel(id);
  try {
    await user.update(payload);
  } catch (err) {
    throw new InternalError();
  }
  return user.get();
};

const getById = async (id: string): Promise<UserOutput | never> => {
  const user: UserModel = await findModel(id);
  return user.get();
};

const deleteById = async (id: string): Promise<UserOutput | never> => {
  const user: UserModel = await findModel(id);
  try {
    await user.destroy();
  } catch (err) {
    throw new InternalError();
  }
  return user.get();
};

const getAll = async (): Promise<UserOutput[] | never> => {
  try {
    const items = await UserModel.findAll({
      paranoid: true,
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
