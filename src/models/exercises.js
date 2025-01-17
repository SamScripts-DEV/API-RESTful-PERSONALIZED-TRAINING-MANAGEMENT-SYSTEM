import { Schema, model } from 'mongoose';

const exerciseSchema = new Schema({
    bodyPart: { type: String, required: true },
    equipment: { type: String, required: true },
    gifUrl: { type: String, required: true },
    idApi: { type: String },
    name: { type: String, required: true },
    target: { type: String, required: true },
    secondaryMuscles: { type: [String] },
    instructions: { type: [String] },
});

export default model('Exercise', exerciseSchema);
