import { model, Schema } from 'mongoose';

interface Movie {
    id: Schema.Types.ObjectId
    progress: number,
}
interface User {
    name: string
    biography: string
    email: string
    password: string
    following?: Schema.Types.ObjectId[]
    movies?: Movie[]
    lastAccess?: number
}

const MovieSchema = new Schema<Movie>({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    progress: {
        type: Number,
        required: true
    }
});

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
            type: [Schema.Types.ObjectId],
            ref: 'Users',
            required: false,
            default: []
        },
        movies: {
            type: [MovieSchema],
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