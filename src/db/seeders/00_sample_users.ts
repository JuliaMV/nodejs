import { v4 as uuidv4 } from 'uuid';
import { QueryInterface, Sequelize } from 'sequelize';

const seedUsers = [
  {
    id: uuidv4(),
    login: 'admin',
    password: 'admin',
    age: 20,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'admin2',
    password: 'admin2',
    age: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'user1',
    password: 'user1',
    age: 20,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'user2',
    password: 'user2',
    age: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    login: 'user3',
    password: 'user3',
    age: 30,
    createdAt: new Date().toISOString(),
  },
];

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.bulkInsert('Users', seedUsers);
};

export const down = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().bulkDelete('Users', { id: seedUsers.map((u) => u.id) });
};

export default { up, down };
