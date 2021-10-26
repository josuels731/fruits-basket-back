import { model, Schema } from 'mongoose';

interface User {
    name: string
    biography: string
    email: string
    password: string
    following: string[]
    followers: string[]
    movies: string[]
    lastAccess: number
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
            required: true,
        },
        followers: {
            type: [String],
            required: true,
        },
        movies: {
            type: [String],
            required: true,
        },
        lastAccess: {
            type: Number,
            required: false,
        },
    })
);