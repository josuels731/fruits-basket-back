import { Request, Response } from 'express'

interface TmdbResultsPopular {
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
    results: TmdbResultsPopular[]
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
