import { model, Schema } from 'mongoose';

interface Default {
}

export default model<Default>(
    'Defaults',
    new Schema<Default>({

    })
);

export type { Default }