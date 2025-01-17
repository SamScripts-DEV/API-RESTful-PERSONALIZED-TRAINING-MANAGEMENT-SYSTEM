import { Schema, model, Types } from 'mongoose';

const coachSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
    },
    clientes: [
        {
            client_id: {
                type: Types.ObjectId,
                ref: 'Client',
            },
            assignmentDate: {
                type: Date,
                default: Date.now(),
            },
            observation: {
                type: String,
            },
        },
    ],
});

export default model('Coach', coachSchema);
