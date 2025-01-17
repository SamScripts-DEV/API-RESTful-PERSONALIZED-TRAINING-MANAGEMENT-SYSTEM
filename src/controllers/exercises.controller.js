import {
    fetchallexercises,
    fetchExcercisesByID,
} from '../services/exercisesAPI.js';
import Exercise from '../models/exercises.js';
import { schedule } from 'node-cron';

export const syncExercisesOnStart = async () => {
    try {
        const exercises = await fetchallexercises();
        console.log(`Syncing exercises ${exercises?.length} `);

        exercises.forEach(async ({ name, ...data }) => {
            await Exercise.findOneAndUpdate({ name }, data, { upsert: true });
        });
    } catch (error) {
        console.error(error);
    }
};

export const startCronJobForExercises = () => {
    schedule('0 */12 * * *', syncExercisesOnStart, {
        timezone: 'America/Guayaquil',
    });

    console.log(
        'Cron job para sincronizar ejercicios programado cada 12 horas.',
    );
};

export const allExercises = async (_, res) => {
    try {
        res.status(200).json(await fetchallexercises());
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const exercisesByID = async (_, res) => {
    try {
        res.status(200).json(await fetchExcercisesByID());
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const getAllExercisesWithDetails = async (_, res) => {
    try {
        const exercisesIDs = await fetchallexercises();
        if (!exercisesIDs)
            res.status(404).json({ res: 'No se encontraron ejercicios' });

        const exercisesWithDetails = await Promise.all(
            exercisesIDs.map((id) => fetchExcercisesByID(id)),
        );

        res.status(200).json(exercisesWithDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};

// export const getAllExercisesWithDetailsforSave = async () => {
//     try {
//         const exercisesIDs = await fetchallexercises();
//         if (!exercisesIDs) console.log('No se encontraron ejercicios');

//         const exercisesWithDetails = await Promise.all(
//             exercisesIDs.map((id) => fetchExcercisesByID(id)),
//         );

//         await Promise.all(
//             exercisesWithDetails.map(async (exercise) => {
//                 if (exercise.id && exercise.id.trim() !== '')
//                     await Exercise.findOneAndUpdate(
//                         { apiID: exercise.id },
//                         { ...exercise, apiID: exercise.id },
//                         { upsert: true, new: true },
//                     );
//             }),
//         );
//     } catch (error) {
//         console.error(error);
//     }
// };

export const viewAllExercises = async (_, res) => {
    try {
        res.status(200).json(await Exercise.find());
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const viewAllExercisesByID = async (req, res) => {
    try {
        res.status(200).json(await Exercise.findById(req.params.id));
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};
