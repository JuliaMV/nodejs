import { Request } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';

const loginUser: ApiHandler<Request> = async (req, res) => {
  const result = 'token';
  res.status(status.OK).json(result);
};

export default {
  loginUser,
};
