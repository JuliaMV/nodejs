import { Request } from 'express';
import status from 'http-status';

import { ApiHandler } from '../types';
import LoginService from './login.service';

const loginUser: ApiHandler<Request> = async (req, res) => {
  const token = await LoginService.authUser(req.body.login, req.body.password);
  if (token) {
    res.status(status.OK).send(token);
  } else {
    res.status(status.FORBIDDEN).send('Invalid authorization request');
  }
};

export default {
  loginUser,
};
