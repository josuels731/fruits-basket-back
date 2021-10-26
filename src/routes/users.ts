// Libraries
import { Router, Request, Response } from "express";

// Code
const users = Router();

users.get('/', (request: Request, response: Response) => {
  response.send({ url: request.url });
});

export { users };