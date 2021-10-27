import { model, Schema } from 'mongoose';

interface User {
    name: string
    biography: string
    email: string
    password: string
    following?: string[]
    followers?: string[]
    movies?: string[]
    lastAccess?: number
}

export default model<User>(
    'Users',
    new Schema<User>({
        name: {
            type: String,
            required: true,
        },
        biography: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        following: {
            type: [String],
            required: false,
            default: []
        },
        followers: {
            type: [String],
            required: false,
            default: []
        },
        movies: {
            type: [String],
            required: false,
            default: []
        },
        lastAccess: {
            type: Number,
            required: false,
            default: undefined
        },
    })
);

export type { User }