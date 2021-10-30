import status from 'http-status';

import { ApiError } from './ApiError';

export class ResourceNotFoundError extends ApiError {
  constructor(resource: string) {
    super(`Resource ${resource} was not found.`, status.NOT_FOUND);
  }
}
