// Libraries
import { Router, Request, Response } from "express";
import { RequestPostNew, ResponsePostNew, RequestPostLogin, ResponsePostLogin, RequestDelete, ResponseDelete, RequestPatch, ResponsePatch } from './users.d'

// Database Models
import User from '../models/user'

// Code
const users = Router();

users.get('/', (request: Request, response: Response) => {
  response.send({ url: request.url });
});

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


users.post('/login', async (request: RequestPostLogin, response: Response<ResponsePostLogin>) => {
  try {
    const check = await User.findOne(request.body);

    if (check)
      response.status(201).send({ name: check.name, token: 'token', id: check._id });
    else
      response.status(401).send({ error: 'Email or Password is Incorrect' })

  } catch (e) {
    if (e instanceof Error)
      response.status(500).send({ error: e.message })
    else
      response.status(500).send({ error: 'Internal Error' })

  }
});


users.delete('/', async (request: RequestDelete, response: Response<ResponseDelete>) => {
  try {
    const deleted = await User.findByIdAndDelete(request.body.id);

    if (deleted)
      response.status(200).send({ name: deleted.name, email: deleted.email });
    else
      response.status(401).send({ error: 'Id not Found' })

  } catch (e) {
    if (e instanceof Error)
      response.status(500).send({ error: e.message })
    else
      response.status(500).send({ error: 'Internal Error' })

  }
});

users.patch('/', async (request: RequestPatch, response: Response<ResponsePatch>) => {
  const { id, biography, email, name, password } = request.body;
  try {
    const updated = await User.findByIdAndUpdate(id, { email, biography, name, password })

    if (updated)
      response.status(200).send({ email, biography, name });
    else
      response.status(401).send({ error: 'Id not Found' })


  } catch (e) {
    if (e instanceof Error)
      response.status(500).send({ error: e.message })
    else
      response.status(500).send({ error: 'Internal Error' })

  }
});
export { users };