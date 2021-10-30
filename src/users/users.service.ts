import { v4 as uuidv4 } from 'uuid';

import mock from './mock';
import { UserDto, User } from './types';
import { ResourceNotFoundError } from '../errors';

class UsersService {
  private static data: User[] = mock;

  static getAll(): User[] {
    return this.data.filter((item) => !item.isDeleted);
  }

  static getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
    const entities: User[] = this.data
      .filter((item) => item.login.toLowerCase().includes(loginSubstring.toLowerCase()) && !item.isDeleted)
      .sort((a, b) => {
        if (a.login > b.login) return 1;
        return -1;
      })
      .slice(0, limit);
    return entities;
  }

  static getById(id: string): User {
    const entity = this.data.find((item) => item.id === id && !item.isDeleted);
    if (!entity) {
      throw new ResourceNotFoundError('user');
    }
    return entity;
  }

  static create(payload: UserDto): User {
    const newItem: User = {
      ...payload,
      id: uuidv4(),
      isDeleted: false,
    };
    console.log(payload, newItem);
    this.data.push(newItem);
    return newItem;
  }

  static update(id: string, payload: UserDto): User {
    const entity: User = this.getById(id);
    const updatedItem: User = { ...entity, ...payload };
    this.data = this.data.map((item) => (item.id === id ? updatedItem : item));
    return updatedItem;
  }

  static softDelete(id: string): User {
    const entity: User = this.getById(id);
    const deletedItem: User = { ...entity, isDeleted: true };
    this.data = this.data.map((item) => (item.id === id ? deletedItem : item));
    return deletedItem;
  }
}

export default UsersService;
