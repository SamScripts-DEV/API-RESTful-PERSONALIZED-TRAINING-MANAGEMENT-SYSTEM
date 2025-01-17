import { Router } from 'express';
import {
    clientRegisterAll,
    clientRegisterOnly,
    confirmEmail,
    configureClientProfile,
    viewRoutineForClient,
    viewClientProfile,
    deleteClient,
    viewAllClients,
    updateClientProfile,
    getTrainingReminders,
    restorePasswordClient,
    newPasswordClient,
    tokenNotification,
} from '../controllers/client.controller.js';
import { validateClient } from '../middlewares/client.validation.js';
import { verifyAuth } from '../middlewares/auth.js';
import { validateUser } from '../middlewares/users.validation.js';
import { verifyAdminRole } from '../middlewares/verifyAdminRol.js';
import {
    markDaysAsCompleted,
    viewCompletedDays,
} from '../controllers/completed_days.controller.js';
const router = Router();

// Rutas publicas
router.post('/client/register', validateClient, clientRegisterAll); // Registra al cliente con todo los datos del perfil incliudos

router.post('/client/only-register', validateUser, clientRegisterOnly); // Registra al cliente con solo email y password

router.post('/client/confirm-email', confirmEmail); // Confirma el email del cliente

// Rutas privadas

router.post('/client/configure-profile', verifyAuth, configureClientProfile); // Configura el perfil del cliente

router.get('/client/view-routine', verifyAuth, viewRoutineForClient); // Muestra la rutina del cliente

router.post('/client/mark-day-completed', verifyAuth, markDaysAsCompleted); // Marcar un dia como completado

router.get('/client/view-completed-days', verifyAuth, viewCompletedDays); // Muestra los dias completados del cliente

router.get('/client/view-profile', verifyAuth, viewClientProfile); // Muestra el perfil del cliente

router.get('/client/view-all', verifyAuth, verifyAdminRole, viewAllClients); // Muestra todos los clientes solo para el usuario administrador

router.put('/client/update-profile', verifyAuth, updateClientProfile); // Actualiza el perfil del cliente

router.post('/client/restore-password', restorePasswordClient); // Restaura la contraseña del cliente

router.put('/client/new-password', newPasswordClient); // Cambia la contraseña del cliente

router.delete('/client/delete/:clientID', verifyAuth, deleteClient); // Elimina al cliente

router.get('/reminders', verifyAuth, getTrainingReminders); // Devuelve los días de entrenamiento del cliente

router.post('/save-notification-token', verifyAuth, tokenNotification); // Guarda el token de notificación del cliente

export default router;
