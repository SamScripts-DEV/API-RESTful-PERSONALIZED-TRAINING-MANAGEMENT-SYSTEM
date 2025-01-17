import jwt from 'jsonwebtoken';

export const generateToken = (id, rol) => {
    const options = rol !== 'cliente' ? { expiresIn: '5h' } : {};

    return jwt.sign({ id, rol }, process.env.JWT_SECRET, options);
};
