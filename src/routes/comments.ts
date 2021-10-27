// Libraries
import { Router, Response } from "express";
import { RequestGetMovie, RequestGetUser, RequestPostNew, ResponseGetMovie, ResponseGetUser, ResponsePostNew } from './comments.d'

// Database Models
import Comment from "../models/comment";

// Code
const comments = Router();

comments.get('/movie/:id', async (request: RequestGetMovie, response: Response<ResponseGetMovie>) => {
    try {
        const comments = await Comment.find({ movie: request.params.id });

        response.status(200).send({ comments });

    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

comments.get('/user/:id', async (request: RequestGetUser, response: Response<ResponseGetUser>) => {
    try {
        const comments = await Comment.find({ user: request.params.id });

        response.status(200).send({ comments });

    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

comments.post('/new', async (request: RequestPostNew, response: Response<ResponsePostNew>) => {
    const newComment = new Comment(request.body);

    try {
        await newComment.save();

        response.status(201).send({})
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

export { comments };