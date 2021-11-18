// Libraries
import { Router, Response } from "express";
import { Axios } from "axios";
import { authToken } from "../auth";
import { RequestGetDayMostWatched, RequestGetMyMovieData, RequestGetMyMovies, RequestGetSearch, RequestPostAddToList, RequestPostSetProgress, ResponseGetDayMostWatched, ResponseGetMyMovieData, ResponseGetMyMovies, ResponseGetSearch, ResponsePostAddToList, ResponsePostSetProgress, TmdbFullMovieData, TmdbResponsePopular, TmdbResponseSearch } from "./movies.d";
import UserModel, { Movie } from "../models/user";

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

movies.get('/:userId', async (request: RequestGetMyMovies, response: Response<ResponseGetMyMovies>) => {
    try {
        const { userId } = request.params;
        const { notStarted, watching, watched } = request.query;

        let responseData: Movie[] = (await UserModel.findById(userId))?.movies || [];
        if (notStarted === 'false')
            responseData = responseData.filter((data) => data.progress !== 0);
        if (watching === 'false')
            responseData = responseData.filter((data) => data.progress !== 0);
        if (watched === 'false')
            responseData = responseData.filter((data) => data.progress !== 100);

        response.status(200).send({ movies: responseData });
    } catch (e) {
        if (e instanceof Error)
            response.status(500).send({ error: e.message })
        else
            response.status(500).send({ error: 'Internal Error' })
    }
});

movies.get('/:userId/:movieId', async (request: RequestGetMyMovieData, response: Response<ResponseGetMyMovieData>) => {
    try {
        const { userId, movieId } = request.params;

        const responseData: Movie[] = (await UserModel.findById(userId).lean())?.movies || [];

        const movie = responseData.find(movie => movie.id === Number(movieId));
        if (!movie) {
            response.status(404).send({ error: 'Movie internal not found' });
            return;
        }
        const tmdbData = JSON.parse((await MovieDb.get(`/movie/${movieId}`)).data) as TmdbFullMovieData;
        if (!tmdbData) {
            response.status(404).send({ error: 'Movie tmdb not found' });
            return;
        }

        response.status(200).send({ movie: { progress: movie.progress, ...tmdbData } });
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