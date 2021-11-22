import { UserInput, UserOutput } from './types';

import UserDal from './user.dal';

const getAll = async (): Promise<UserOutput[]> => UserDal.getAll();

const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<UserOutput[]> => {
  const entities: UserOutput[] = await UserDal.getAll();
  return entities
    .filter((item) => item.login.toLowerCase().includes(loginSubstring.toLowerCase()))
    .sort((a, b) => {
      if (a.login > b.login) return 1;
      return -1;
    })
    .slice(0, limit);
};

const getById = async (id: string): Promise<UserOutput> => {
  const entity = await UserDal.getById(id);
  return entity;
};

const create = async (payload: UserInput): Promise<UserOutput> => UserDal.create(payload);

const update = async (id: string, payload: UserInput): Promise<UserOutput> => UserDal.update(id, payload);

const deleteById = async (id: string): Promise<UserOutput> => {
  const result = await UserDal.deleteById(id);
  return result;
};

const addUsersToGroup = async (userIds: string[], groupId: string): Promise<void> => UserDal.addUsersToGroup(userIds, groupId);

export default {
  getAll,
  getAutoSuggestUsers,
  getById,
  create,
  update,
  deleteById,
  addUsersToGroup,
};
