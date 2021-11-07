import Umzug from 'umzug';
import path from 'path';
import sequelizeConnection from './config';

const migrator = new Umzug({
  migrations: {
    path: path.join(__dirname, './migrations'),
    params: [
      sequelizeConnection.getQueryInterface(),
    ],
    pattern: /\.ts$/,
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelizeConnection,
  },
});

const seeder = new Umzug({
  migrations: {
    path: path.join(__dirname, './seeders'),
    params: [
      sequelizeConnection.getQueryInterface(),
    ],
    pattern: /\.ts$/,
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize: sequelizeConnection,
  },
});

export const migrateAll = () => migrator.up().then(() => seeder.up());
export const sampleDataRemove = () => seeder.down();
