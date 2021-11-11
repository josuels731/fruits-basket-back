// Libraries
import { connect, connection } from 'mongoose';
import { mongoUrl } from './auth';
import { error, log } from './assets/logger';

// Code
connect(mongoUrl);

connection.on('error', err => error(err, 'database_connection'));
connection.on('connecting', () => log('Connecting to the database', 'database_connection'));
connection.on('connected', () => log('Connected to the database', 'database_connection'));
