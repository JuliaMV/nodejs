import { Router } from 'express';

import LoginController from './login.contoroller';

const LoginRouter = Router()
  .post('/', LoginController.loginUser);

export default LoginRouter;
