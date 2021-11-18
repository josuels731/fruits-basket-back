import { Request, Response } from 'express'
import { ObjectId } from 'mongoose';
import { Movie } from '../models/user';

interface TmdbMovieData {
    adult?: boolean
    backdrop_path?: string
    genre_ids?: number[]
    id?: number
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    release_date?: string
    title?: string
    video?: boolean
    vote_average?: number
    vote_count?: number
}
interface TmdbFullMovieData {
    adult?: boolean,
    backdrop_path?: string
    budget?: number,
    genres?: { id: number, name: string }[],
    homepage?: string,
    id?: number,
    imdb_id?: string,
    original_language?: string
    original_title?: string
    overview?: string
    popularity?: number
    poster_path?: string
    production_companies?: { id: number, logo_path: string, name: string, origin_country: string }[],
    production_countries?: { iso_3166_1: string, name: string }[],
    release_date?: string,
    revenue?: number,
    runtime?: number,
    spoken_languages?: { iso_639_1: string, name: string }[],
    status?: string,
    tagline?: string,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number
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
        watching?: 'false' | 'true',
        notStarted?: 'false' | 'true',
        watched?: 'false' | 'true',
    },
    params: {
        userId: string
    }
}
interface ResponseGetMyMovies {
    movies?: Movie[],
    error?: string
}

interface RequestGetMyMovieData extends Request {
    params: {
        userId: string
        movieId: string
    }
}
interface ResponseGetMyMovieData {
    movie?: {
        progress: number,
        adult?: boolean,
        backdrop_path?: string
        budget?: number,
        genres?: { id: number, name: string }[],
        homepage?: string,
        id?: number,
        imdb_id?: string,
        original_language?: string
        original_title?: string
        overview?: string
        popularity?: number
        poster_path?: string
        production_companies?: { id: number, logo_path: string, name: string, origin_country: string }[],
        production_countries?: { iso_3166_1: string, name: string }[],
        release_date?: string,
        revenue?: number,
        runtime?: number,
        spoken_languages?: { iso_639_1: string, name: string }[],
        status?: string,
        tagline?: string,
        title?: string,
        video?: boolean,
        vote_average?: number,
        vote_count?: number
    }
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
