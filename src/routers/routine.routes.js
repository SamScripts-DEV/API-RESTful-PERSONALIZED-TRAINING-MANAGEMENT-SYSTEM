import { Router } from 'express';
import {
    createRoutine,
    viewAllRoutines,
    viewRoutineById,
    updateRoutine,
    deleteRoutine,
    viewRoutinesByClientId,
} from '../controllers/routine.controller.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/routine/create-routine', verifyAuth, createRoutine); // Crea una rutina
router.get('/routine/view-routines', verifyAuth, viewAllRoutines); // Muestra todas las rutinas
router.get('/routine/view-routine/:id', verifyAuth, viewRoutineById); // Muestra una rutina por id7
router.get(
    '/routine/view-routines/:clientId',
    verifyAuth,
    viewRoutinesByClientId,
); // Muestra todas las rutinas de un cliente
router.put('/routine/update-routine/:id', verifyAuth, updateRoutine); // Actualiza una rutina por id
router.delete('/routine/delete-routine/:id', verifyAuth, deleteRoutine); // Elimina una rutina por id

export default router;
