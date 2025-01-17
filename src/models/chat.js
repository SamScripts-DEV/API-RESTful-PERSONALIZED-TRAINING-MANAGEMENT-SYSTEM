import { Schema, model, Types } from 'mongoose';

const chatSchema = new Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
        },
        transmitter: {
            type: String,
            required: true,
            trim: true,
        },
        receiver: {
            type: String,
            required: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },
        rol: {
            type: String,
            required: true,
            trim: true,
        },
        client_id: {
            type: Types.ObjectId,
            ref: 'Client',
        },
        coach_id: {
            type: Types.ObjectId,
            ref: 'Coach',
        },
    },
    { timestamps: true },
);

export default model('Chat', chatSchema);
