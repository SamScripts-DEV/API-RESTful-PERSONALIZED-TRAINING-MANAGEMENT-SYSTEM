import { Schema, model, Types } from 'mongoose';

const routineSchema = new Schema({
    client_id: {
        type: Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    coach_id: {
        type: Types.ObjectId,
        ref: 'Coach',
        required: true,
    },
    days: [
        {
            day: {
                type: String,
                enum: [
                    'lunes',
                    'martes',
                    'miercoles',
                    'jueves',
                    'viernes',
                    'sabado',
                    'domingo',
                ],
                required: true,
            },
            exercises: [
                {
                    type: Types.ObjectId,
                    ref: 'Exercise',
                    required: true,
                },
            ],
        },
    ],
    assignment_date: {
        type: Date,
        default: Date.now,
    },
    nameRoutine: {
        type: String,
        required: true,
        trim: true,
    },
    comments: {
        type: String,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    duration_days: {
        type: Number,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

export default model('Routine', routineSchema);
