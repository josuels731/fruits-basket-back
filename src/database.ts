// Libraries
import { connect, connection } from 'mongoose';
import { error, log } from 'assets/logger';

// Constant values definition
const URL = 'mongodb+srv://backend:backend@cluster0.1pzji.mongodb.net/fruitsBasket?retryWrites=true&w=majority'

// Code
connect(URL);

connection.on('error', err => error(err, 'database_connection'));
connection.on('connecting', () => log('Connecting to the database', 'database_connection'));
connection.on('connected', () => log('Connected to the database', 'database_connection'));
