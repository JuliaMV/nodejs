import { DataTypes, Model } from 'sequelize';
import UserModel from '../users/user.model';
import GroupModel from '../groups/group.model';
import sequelizeConnection from '../db/config';

class UserGroupModel extends Model {
  userId!: string;

  groupId!: string;
}

UserGroupModel.init({
  userId: {
    type: DataTypes.STRING,
    references: {
      model: UserModel,
      key: 'id',
    },
  },
  groupId: {
    type: DataTypes.STRING,
    references: {
      model: GroupModel,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  sequelize: sequelizeConnection,
  modelName: 'UserGroup',
});

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'groupId' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'userId' });

export default UserGroupModel;
