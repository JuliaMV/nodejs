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
    type: DataTypes.UUID,
    references: {
      model: UserModel,
      key: 'id',
    },
    unique: false,
  },
  groupId: {
    type: DataTypes.UUID,
    references: {
      model: GroupModel,
      key: 'id',
    },
    unique: false,
  },
}, {
  timestamps: false,
  sequelize: sequelizeConnection,
  modelName: 'UserGroup',
});

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'userId' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'groupId' });

export default UserGroupModel;
