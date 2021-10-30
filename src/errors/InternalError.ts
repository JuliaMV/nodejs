import status from 'http-status';

import { ApiError } from './ApiError';

export class InternalError extends ApiError {
  constructor() {
    super('Internal Error.', status.INTERNAL_SERVER_ERROR);
  }
}
