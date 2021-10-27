import { model, Schema } from 'mongoose';

interface Comment {
    user: Schema.Types.ObjectId
    movie: Schema.Types.ObjectId
    comment: string
    score: number
}

export default model<Comment>(
    'Comments',
    new Schema<Comment>({
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
        movie: {
            type: Schema.Types.ObjectId,
            ref: 'Movies',
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
    })
);

export type { Comment }