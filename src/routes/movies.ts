// Libraries
import { Router, Response } from "express";
import { Axios } from "axios";
import { authToken } from "../auth";
import { RequestGetDayMostWatched, RequestGetSearch, RequestPostAddToList, RequestPostSetProgress, ResponseGetDayMostWatched, ResponseGetSearch, ResponsePostAddToList, ResponsePostSetProgress, TmdbResponsePopular, TmdbResponseSearch } from "./movies.d";
import UserModel from "../models/user";

const MovieDb = new Axios({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        Authorization: `Bearer ${authToken}`
    }
})

// Code
const movies = Router();

movies.get('/dayMostWatched', async (_request: RequestGetDayMostWatched, response: Response<ResponseGetDayMostWatched>) => {
    try {
        const data = JSON.parse((await MovieDb.get('/movie/popular')).data) as TmdbResponsePopular;

        response.status(200).send({ movies: data.results });
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

movies.get('/search', async (request: RequestGetSearch, response: Response<ResponseGetSearch>) => {
    try {
        const data = JSON.parse((await MovieDb.get('/search/movie', { params: request.query })).data) as TmdbResponseSearch;

        response.status(200).send({ movies: data.results });
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })
    }
});

movies.post('/addToList', async (request: RequestPostAddToList, response: Response<ResponsePostAddToList>) => {
    try {
        const { movie, user: userId } = request.body;

        await UserModel.findByIdAndUpdate(userId, { $push: { movies: { id: movie, progress: 0 } } });

        response.status(200).send({ done: true });
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});

movies.patch('/setProgress', async (request: RequestPostSetProgress, response: Response<ResponsePostSetProgress>) => {
    try {
        const { movie, user: userId, progress } = request.body;

        await UserModel.findByIdAndUpdate(userId, { $set: { "movies.$[id].progress": progress } }, { arrayFilters: [{ "id.id": movie }] });


        response.status(200).send({ done: true });
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })

    }
});


export { movies };