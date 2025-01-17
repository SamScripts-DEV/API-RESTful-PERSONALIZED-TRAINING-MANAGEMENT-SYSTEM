import { Router } from 'express';
import {
    userRegister,
    login,
    logout,
    updatePassword,
    restorePassword,
    confirmTokenPassword,
    newPassword,
    ViewProfile,
} from '../controllers/users.controller.js';
import { validateUser } from '../middlewares/users.validation.js';
import { verifyAuth } from '../middlewares/auth.js';
import { sendEmailRutin } from '../config/nodemailer.js';

const router = Router();

// Public routes
router.post('/sign-up', validateUser, userRegister); // Regsitra un usuario (usado para administrador)
router.post('/login', login); // inicia sesión para todos los usuarios independientemente del rol
router.get('/logout', verifyAuth, logout); // Cierra sesión para todos los usuarios independientemente del rol

router.get('/user/profile', verifyAuth, ViewProfile); // Muestra el perfil del usuario

router.post('/users/recovery-password', restorePassword); // Envia un correo para recuperar la contraseña
router.get('/users/confirm/:token', confirmTokenPassword); // Confirma el token para cambiar la contraseña
router.post('/users/new-password/:token', newPassword); // Cambia la contraseña una vez confirmado el token

router.post('/send-email', sendEmailRutin); // Envia un correo
// Private routes
router.put('/users/update-password:token', verifyAuth, updatePassword); // Actualiza la contraseña una vez proporcionado el token en los headers

export default router;
