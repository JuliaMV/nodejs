import User from '../users/user.model';
import Group from '../groups/group.model';
import UserGroup from '../associations/user-group.model';

const isDev = process.env.NODE_ENV !== 'production';

const dbInit = () => Promise.all([
  User.sync({ alter: isDev }),
  Group.sync({ alter: isDev }),
  UserGroup.sync({ alter: isDev }),
]);

export default dbInit;
