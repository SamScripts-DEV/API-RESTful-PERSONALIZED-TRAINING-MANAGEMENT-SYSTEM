import { Schema, model, Types } from 'mongoose';

const completedDaysSchema = new Schema({
    client_id: {
        type: Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    day: {
        type: String,
        enum: [
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sabado',
            'domingo',
        ],
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default model('CompletedDays', completedDaysSchema);
