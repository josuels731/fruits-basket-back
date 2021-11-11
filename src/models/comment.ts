import { model, Schema } from 'mongoose';

interface Comment {
    user: Schema.Types.ObjectId
    movie: string
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
            type: String,
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