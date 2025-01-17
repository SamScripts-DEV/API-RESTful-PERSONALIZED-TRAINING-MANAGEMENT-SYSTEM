import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const verifyAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization)
        return res
            .status(401)
            .json({ res: 'Acceso denegado proporciona un token válido' });

    try {
        const { id, rol } = jwt.verify(
            authorization.split(' ')[1],
            process.env.JWT_SECRET,
        );
        const user = await User.findById(id).lean().select('-password');

        if (!user || user.logout)
            return res.status(401).json({
                res: 'Usuario no encontrado, intente iniciar sesión nuevamente',
            });

        req.userBDD = { ...user, rol };

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            res: 'Acceso denegado, token inválido o expirado, comuniquese con el soporte.',
        });
    }
};
