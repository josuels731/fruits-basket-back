// Libraries
import { Router, Request, Response } from "express";

// Code
const root = Router();

root.get('/', (request: Request, response: Response) => {
  response.send({ url: request.url });
});

export { root };