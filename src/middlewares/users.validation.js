import { check, validationResult } from 'express-validator';

export const validateUser = [
    check(['name', 'lastname', 'email', 'password'])
        .exists()
        .withMessage(
            'Los campos nombre, apellido, correo y contraseña son oligatorios',
        )
        .notEmpty()
        .withMessage(
            'Los campos nombre, apellido, correo y/o contraseña no pueden estar vacíos',
        )
        .customSanitizer((value) => value?.trim()),

    check(['name', 'lastname'])
        .isString()
        .isLength({ min: 3, max: 20 })
        .withMessage('El nombre y apellido deben tener entre 3 y 20 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
        .withMessage('El nombre y apellido deben contener solo letras')
        .customSanitizer((value) => value?.trim()),

    check('email')
        .isEmail()
        .withMessage('El correo electrónico no es válido')
        .customSanitizer((value) => value?.trim()),

    check('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/)
        .withMessage(
            'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial',
        )
        .customSanitizer((value) => value?.trim()),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        return next();
    },
];
