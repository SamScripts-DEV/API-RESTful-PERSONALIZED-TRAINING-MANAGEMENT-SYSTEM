import { set, connect } from 'mongoose';
import {
    syncExercisesOnStart,
    startCronJobForExercises,
} from './controllers/exercises.controller.js';

set('strictQuery', true);

export const connectionToDatabase = async () => {
    try {
        const {
            connection: { host, port },
        } = await connect(process.env.MONGO_URI_PRODUCTION);

        console.log(`Database connected to: ${host} - ${port}`);

        await syncExercisesOnStart();
        startCronJobForExercises();
    } catch (error) {
        console.log(error);
    }
};
