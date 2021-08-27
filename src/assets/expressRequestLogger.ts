// Libraries
import { Request, Response, NextFunction } from 'express';

// Assets
import { log } from './logger';

// Code
function requestLogger(request: Request, _response: Response, next: NextFunction) {
  log(`Request on ${request.url}`, 'server_requests');
  next();
}

export { requestLogger };