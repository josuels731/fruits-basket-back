import { model, Schema } from 'mongoose';

interface Movie {
    name: string
    description: string
    score: number
    releaseDate: number
    cast: string[]
    director: string
    trailers: string[]
    images: string[]
}

export default model<Movie>(
    'Movies',
    new Schema<Movie>({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        releaseDate: {
            type: Number,
            required: true,
        },
        cast: {
            type: [String],
            required: true,
        },
        director: {
            type: String,
            required: true,
        },
        trailers: {
            type: [String],
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
    })
);

export type { Movie }