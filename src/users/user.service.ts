/* eslint-disable class-methods-use-this */

import { UserInput, UserOutput } from './types';

import UserDal from './user.dal';

class UserService {
  async getAll(): Promise<UserOutput[]> {
    return UserDal.getAll();
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<UserOutput[]> {
    const entities: UserOutput[] = await UserDal.getAll();
    return entities
      .filter((item) => item.login.toLowerCase().includes(loginSubstring.toLowerCase()))
      .sort((a, b) => {
        if (a.login > b.login) return 1;
        return -1;
      })
      .slice(0, limit);
  }

  async getById(id: string): Promise<UserOutput> {
    const entity = await UserDal.getById(id);
    return entity;
  }

  async create(payload: UserInput): Promise<UserOutput> {
    return UserDal.create(payload);
  }

  async update(id: string, payload: UserInput): Promise<UserOutput> {
    return UserDal.update(id, payload);
  }

  async deleteById(id: string): Promise<UserOutput> {
    const result = await UserDal.deleteById(id);
    return result;
  }

  async addUsersToGroup(userIds: string[], groupId: string): Promise<void> {
    return UserDal.addUsersToGroup(userIds, groupId);
  }
}

export default UserService;
