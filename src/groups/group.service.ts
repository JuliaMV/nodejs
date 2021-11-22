import { GroupInput, GroupOutput } from './types';

import GroupDal from './group.dal';

const getAll = async (): Promise<GroupOutput[]> => GroupDal.getAll();

const getById = async (id: string): Promise<GroupOutput> => {
  const entity = await GroupDal.getById(id);
  return entity;
};

const create = async (payload: GroupInput): Promise<GroupOutput> => GroupDal.create(payload);

const update = async (id: string, payload: GroupInput): Promise<GroupOutput> => GroupDal.update(id, payload);

const deleteById = async (id: string): Promise<GroupOutput> => GroupDal.deleteById(id);

export default {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
