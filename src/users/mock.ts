import { v4 as uuidv4 } from 'uuid';

export default [
  {
    id: uuidv4(),
    login: 'admin',
    password: 'admin',
    age: 20,
    isDeleted: true,
  },
  {
    id: uuidv4(),
    login: 'admin2',
    password: 'admin2',
    age: 30,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'user1',
    password: 'user1',
    age: 20,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'user2',
    password: 'user2',
    age: 30,
    isDeleted: false,
  },
  {
    id: uuidv4(),
    login: 'user3',
    password: 'user3',
    age: 30,
    isDeleted: false,
  },
];
