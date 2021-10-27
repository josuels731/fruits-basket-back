import { Request, Response } from 'express'
import { Movie } from '../models/movie'

interface RequestGet extends Request {
}
interface ResponseGet {
    error?: string,
    movies?: Movie[]
}

interface RequestGetId extends Request {
    params: {
        id: string
    }
}
interface ResponseGetId {
    error?: string,
    movie?: Movie
}

interface RequestPostNew extends Request {
    body: Movie
}
interface ResponsePostNew {
    error?: string,
    name?: string
}
