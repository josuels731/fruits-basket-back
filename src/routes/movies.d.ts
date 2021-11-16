import { Request, Response } from 'express'
import { ObjectId } from 'mongoose';
import { Movie } from '../models/user';

interface TmdbMovieData {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
interface TmdbResponsePopular {
    results: TmdbMovieData[]
    page: number
    total_pages: number
    total_results: number
}
interface RequestGetDayMostWatched extends Request {
}
interface ResponseGetDayMostWatched {
    movies?: TmdbResultsPopular[],
    error?: string
}

interface TmdbResponseSearch {
    results: TmdbMovieData[]
    page: number
    total_pages: number
    total_results: number
}
interface RequestGetSearch extends Request {
    query: {
        query: string
    }
}
interface ResponseGetSearch {
    movies?: TmdbResultsPopular[],
    error?: string
}

interface RequestPostAddToList extends Request {
    body: {
        user: ObjectId,
        movie: number
    }
}
interface ResponsePostAddToList {
    done?: boolean,
    error?: string
}

interface RequestGetMyMovies extends Request {
    query: {
        watching?: boolean,
        notStarted?: boolean,
        watched?: boolean,
    },
    params: {
        userId: ObjectId
    }
}
interface ResponseGetMyMovies {
    movies?: Movie[],
    error?: string
}

interface RequestPostSetProgress extends Request {
    body: {
        user: ObjectId,
        movie: number,
        progress: number
    }
}
interface ResponsePostSetProgress {
    done?: boolean,
    error?: string
}
