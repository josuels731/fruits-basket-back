import { model, Schema } from 'mongoose';

interface Comment {
}

export default model<Comment>(
    'Comments',
    new Schema<Comment>({

    })
);

export type { Comment as Default }