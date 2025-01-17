export const verifyAdminRole = (req, res, next) => {
    try {
        if (req.userBDD.rol !== 'administrador') {
            return res.status(403).json({
                res: 'Acceso denegado. Solo los administradores pueden realizar esta acción.',
            });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor.', error });
    }
};
