// Libraries
import { Router, Response } from "express";
import { RequestGet, RequestGetId, RequestPostNew, ResponseGet, ResponseGetId, ResponsePostNew } from './movies.d'

// Database Models
import Movie from '../models/movie';

// Code
const movies = Router();

movies.get('/', async (request: RequestGet, response: Response<ResponseGet>) => {
    try {
        const movies = await Movie.find();

        if (movies)
            response.status(200).send({ movies: movies });

    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

movies.get('/:id', async (request: RequestGetId, response: Response<ResponseGetId>) => {
    try {
        const movie = await Movie.findById(request.params.id)

        if (movie)
            response.status(200).send({ movie: movie });

    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});


movies.post('/new', async (request: RequestPostNew, response: Response<ResponsePostNew>) => {
    const newMovie = new Movie(request.body);

    try {
        const save = await newMovie.save();

        response.status(201).send({ name: save.name })
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

export { movies };