import { check, validationResult } from 'express-validator';

export const validateClient = [
    check([
        'name',
        'lastname',
        'email',
        'password',
        'genre',
        'weight',
        'height',
        'age',
        'levelactivity',
        'days',
        'coach_id',
    ])
        .exists()
        .withMessage(
            'Los campos nombre, apellido, correo, contraseña, género, peso, altura, edad, nivel de actividad, días y id de entrenador son oligatorios',
        )
        .notEmpty()
        .withMessage(
            'Los campos nombre, apellido, correo, contraseña, género, peso, altura, edad, nivel de actividad, días y/o id de entrenador no pueden estar vacíos',
        )
        .customSanitizer((value) =>
            typeof value === 'string' ? value.trim() : value,
        ),

    check(['name', 'lastname'])
        .isString()
        .isLength({ min: 3, max: 20 })
        .isAlpha('es-ES', { ignore: 'áéíóúñÁÉÍÓÚÑ' })
        .withMessage('El nombre y apellido deben contener solo letras')
        .customSanitizer((value) =>
            typeof value === 'string' ? value.trim() : value,
        ),

    check('email')
        .isEmail()
        .withMessage('El correo electrónico no es válido')
        .customSanitizer((value) =>
            typeof value === 'string' ? value.trim() : value,
        ),

    check('genre')
        .isString()
        .isIn(['masculino', 'femenino'])
        .withMessage('El género debe ser masculino o femenino')
        .customSanitizer((value) =>
            typeof value === 'string' ? value.trim() : value,
        ),

    check('weight')
        .isFloat({ min: 30, max: 300 })
        .withMessage('El peso debe ser un número entre 30 y 300 kg'),

    check('height')
        .isFloat({ min: 100, max: 250 })
        .withMessage('La altura debe ser un número entre 100 y 250 cm'),

    check('age')
        .isInt({ min: 10, max: 100 })
        .withMessage('La edad debe ser un número entre 10 y 100 años'),

    check('levelactivity')
        .isString()
        .isIn(['principiantes', 'intermedio', 'avanzado'])
        .withMessage(
            'El nivel de actividad debe ser principiantes, intermedio o avanzado',
        )
        .customSanitizer((value) =>
            typeof value === 'string' ? value.trim() : value,
        ),

    check('days')
        .isArray()
        .custom((days) =>
            days.every((day) =>
                [
                    'lunes',
                    'martes',
                    'miercoles',
                    'jueves',
                    'viernes',
                    'sabado',
                    'domingo',
                ].includes(day),
            ),
        )
        .withMessage('Debes seleccionar al menos un día de la semana')
        .customSanitizer((value) =>
            Array.isArray(value) ? value.map((day) => day.trim()) : value,
        ),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        return next();
    },
];
