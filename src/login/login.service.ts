import jwt from 'jsonwebtoken';
import UserModel from '../users/user.model';

const authUser = async (login: string, password: string): Promise<string | undefined> => {
  const user = await UserModel.findOne({
    where: {
      login,
      password,
    },
    raw: true,
  });
  let token: string | undefined;
  if (user) {
    const payload = { userId: user.id };
    token = jwt.sign(payload, process.env.SECRET as string);
  }
  return token;
};

export default {
  authUser,
};
