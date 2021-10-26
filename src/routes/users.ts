// Libraries
import { Router, Request, Response } from "express";

// Database Models
// import User from 'models/user'

// Code
const users = Router();

users.get('/', (request: Request, response: Response) => {
  response.send({ url: request.url });
});

interface RequestPostNew extends Request {
  body: {
    aaa: string
  }
}
interface ResponsePostNew {
}
users.post('/new', (request: RequestPostNew, response: Response<ResponsePostNew>) => {
  response.send({ url: request.url });
});

export { users };