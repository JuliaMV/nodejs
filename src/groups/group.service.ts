/* eslint-disable class-methods-use-this */


import { GroupInput, GroupOutput } from './types';

import GroupDal from './group.dal';

class GroupService {
  async getAll(): Promise<GroupOutput[]> {
    return GroupDal.getAll();
  }

  async getById(id: string): Promise<GroupOutput> {
    const entity = await GroupDal.getById(id);
    return entity;
  };

  async create(payload: GroupInput): Promise<GroupOutput> {
    return GroupDal.create(payload);
  }

  async update(id: string, payload: GroupInput): Promise<GroupOutput> {
    return  GroupDal.update(id, payload);
  }

  async  deleteById (id: string): Promise<GroupOutput> {
    return GroupDal.deleteById(id);
  }

}

export default GroupService;
