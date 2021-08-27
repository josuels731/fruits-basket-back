import express, { json, Request, Response, NextFunction } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { log } from './assets/logger';

const PORT = 80;

const server = express();
const http = createServer(server);

server.use(cors());
server.use(json());
server.use(requestLogger)

server.get('/', root)
http.listen(PORT);
log(`Server available at port ${PORT}`, 'server_main');

function requestLogger(request: Request, _response: Response, next: NextFunction) {
  log(`Request on ${request.url}`, 'server_requests');
  next();
}
function root(request: Request, response: Response) {
  response.send({ url: request.url });
}
