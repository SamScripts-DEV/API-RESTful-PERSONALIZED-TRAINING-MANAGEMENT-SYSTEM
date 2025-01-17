import { Router } from 'express';
import {
    coachRegister,
    viewCoaches,
    viewCoachById,
    updateCoach,
    deleteCoach,
    getClientsByCoach,
    getClientByCoachById,
    viewCoachProfile,
    getClientsByCoachId,
    updateCoachProfile,
    chat,
} from '../controllers/coach.controller.js';
import { verifyAuth } from '../middlewares/auth.js';
import { verifyAdminRole } from '../middlewares/verifyAdminRol.js';
import Chat from '../models/chat.js';

const router = Router();

router.get('/chats/:client_id/:coach_id', verifyAuth, chat); // Muestra el chat entre cliente y entrenador

// Public routes
router.post('/coach/register', coachRegister); // Registra un entrenador

// Private routes
router.get('/coach/view-coaches', verifyAuth, viewCoaches); // Muestra todos los entrenadores
router.get('/coach/view-coach/:id', verifyAuth, viewCoachById); // Muestra un entrenador por id
router.put('/coach/update-coach/:id', verifyAuth, updateCoach); // Actualiza un entrenador por id
router.delete(
    '/coach/delete-coach/:id',
    verifyAuth,
    verifyAdminRole,
    deleteCoach,
); // Elimina un entrenador por id

router.get('/coach/get-clients', verifyAuth, getClientsByCoach); // Muestra los clientes de un entrenador por id
router.get('/coach/get-client/:clientID', verifyAuth, getClientByCoachById); // Muestra el detalle de un solo cliente

router.get('/coach/get-clients/:coachID', verifyAuth, getClientsByCoachId); // Muestra los clientes de un entrenador por el ID del entrenador

router.get('/coach/view-profile', verifyAuth, viewCoachProfile); // Muestra el perfil del entrenador

router.put('/coach/update-profile', verifyAuth, updateCoachProfile); // Actualiza el perfil del entrenador

export default router;
