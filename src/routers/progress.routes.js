import { Router } from 'express';
import {
    createProgress,
    viewProgressById,
    viewAllProgressByClientId,
    updateProgress,
    deleteProgress,
} from '../controllers/progress.controller.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/progress', verifyAuth, createProgress); // Crea un nuevo progreso
router.get('/progress/:id', verifyAuth, viewProgressById); // Muestra un progreso por su id
router.get(
    '/progress/client/:client_id',
    verifyAuth,
    viewAllProgressByClientId,
); // Muestra todos los progresos de un cliente Alejandro
router.put('/progress/:id', verifyAuth, updateProgress); // Actualiza un progreso por su id
router.delete('/progress/:id', verifyAuth, deleteProgress); // Elimina un progreso por su id

export default router;
