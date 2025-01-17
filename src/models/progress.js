import { Schema, model, Types } from 'mongoose';

const progressSchema = new Schema({
    client_id: {
        type: Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    currentWeight: {
        type: Number,
        trim: true,
        required: true,
    },
    observations: {
        type: String,
        trim: true,
    },
});

export default model('Progress', progressSchema);
