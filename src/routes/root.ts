// Libraries
import { Router, Request, Response } from "express";

// Code
const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.send({ url: request.url });
});

export { router };