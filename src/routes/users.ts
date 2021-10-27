// Libraries
import { Router, Request, Response } from "express";

// Database Models
import User from '../models/user'

// Code
const users = Router();

users.get('/', (request: Request, response: Response) => {
  response.send({ url: request.url });
});

interface RequestPostNew extends Request {
  body: {
    name: string
    biography: string
    email: string
    password: string
  }
}
interface ResponsePostNew {
  error?: string
  email?: string
  name?: string
}
users.post('/new', async (request: RequestPostNew, response: Response<ResponsePostNew>) => {
  const newUser = new User(request.body);

  try {
    const save = await newUser.save();

    response.status(201).send({ email: save.email, name: save.name })
  } catch (e) {
    if (e instanceof Error)
      response.status(500).send({ error: e.message })
    else
      response.status(500).send({ error: 'Internal Error' })

  }
});

export { users };