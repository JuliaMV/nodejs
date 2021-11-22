import { DataTypes, Model } from 'sequelize';

import sequelizeConnection from '../db/config';
import { Group, GroupInput, Permission } from './types';

class GroupModel extends Model<Group, GroupInput> implements Group {
  public id!: string;

  public name!: string;

  public permissions!: Permission[];
}

GroupModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
}, {
  timestamps: false,
  sequelize: sequelizeConnection,
  paranoid: false,
  modelName: 'Groups',
});

export default GroupModel;
