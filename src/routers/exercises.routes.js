import { Router } from 'express';

import {
    allExercises,
    getAllExercisesWithDetails,
    exercisesByID,
    viewAllExercises,
    viewAllExercisesByID,
} from '../controllers/exercises.controller.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();

// Endpoints de la API, directamente consumen del API
router.get('/exercises', allExercises); // Muestra todos los IDS de los ejercicios disponibles
router.get('/exercises/details', exercisesByID);
router.get('/exercises/details/all', getAllExercisesWithDetails); // Muestra todos los ejercicios con detalle

// Endpoints que obtiene de la base de datos del sistema
router.get('/view-exercises', viewAllExercises); // Muestra todos los ejercicios guardados en la base de datos del sistema
router.get('/view-exercises/:id', verifyAuth, viewAllExercisesByID); // Muestra un ejercicio en específico por su ID guardados en la base de datos del sistema

export default router;
