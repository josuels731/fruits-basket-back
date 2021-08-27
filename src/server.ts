import express, { json, Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { log } from './assets/logger';

const PORT = 80;

const server = express();
const http = createServer(server);

server.use(cors());
server.use(json());

server.get('/', root)
http.listen(PORT);
log(`Server available at port ${PORT}`, 'server_main');

function root(request: Request, response: Response) {
  log('Request', 'server_main')
  response.send({ url: request.url });
}
