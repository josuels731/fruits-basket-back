// Libraries
import express, { json } from 'express';
import { createServer } from 'http';
import cors from 'cors';

// Assets
import { log } from 'assets/logger';
import { requestLogger } from 'assets/expressRequestLogger';

// Routes
import { root } from 'routes/root';
import { users } from 'routes/users';

// Constant values definition
const PORT = 80;

// Code
const server = express();
const http = createServer(server);

server.use(cors());
server.use(json());
server.use(requestLogger)

server.use('/', root);
server.use('/users', users);

http.listen(PORT);
log(`Server available at port ${PORT}`, 'server_main');