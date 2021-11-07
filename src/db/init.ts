import User from '../users/user.model';

const isDev = process.env.NODE_ENV !== 'production';

const dbInit = () => Promise.all([
  User.sync({ alter: isDev }),
]);

export default dbInit;


