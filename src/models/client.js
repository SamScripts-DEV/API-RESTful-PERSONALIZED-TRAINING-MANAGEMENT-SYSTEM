import { Schema, model, Types } from 'mongoose';

const clientSchema = new Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    genre: {
        type: String,
        enum: ['masculino', 'femenino'],
        required: true,
        trim: true,
    },
    weight: {
        type: Number,
        required: true,
        trim: true,
    },
    height: {
        type: Number,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    levelactivity: {
        type: String,
        enum: ['principiante', 'intermedio', 'avanzado'],
        required: true,
        trim: true,
    },
    days: {
        type: [String],
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
    coach_id: {
        type: Types.ObjectId,
        ref: 'Coach',
    },
    progress: [
        {
            type: Types.ObjectId,
            ref: 'Progress',
        },
    ],
    notificationToken: {
        type: String,
    },
});

export default model('Client', clientSchema);
