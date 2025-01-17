import User from '../models/user.js';
import Client from '../models/client.js';
import Routine from '../models/routine.js';
import Progress from '../models/progress.js';
import Coach from '../models/coach.js';
import {
    generateVerificationCode,
    sendVerificationMail,
} from '../config/nodemailer.js';

export const clientRegisterAll = async (req, res) => {
    try {
        const {
            name,
            lastname,
            email,
            password,
            genre,
            weight,
            height,
            age,
            levelactivity,
            days,
            coach_id,
        } = req.body;

        if (await User.exists({ email }))
            return res
                .status(400)
                .json({ res: 'El email ya se encuentra registrado' });

        const newUser = new User({
            name,
            lastname,
            email,
            password,
            rol: 'cliente',
        });

        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();

        const newClient = await User.create({
            user_id: newUser._id,
            genre,
            weight,
            height,
            age,
            levelactivity,
            days,
            coach_id,
        });

        res.status(201).json({
            res: 'Cliente registrado correctamente',
            newUser,
            newClient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const clientRegisterOnly = async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({
                res: 'Rellene todos los campos antes de enviar la solicitud',
            });

        if (await User.exists({ email }))
            return res
                .status(400)
                .json({ res: 'El email ya se encuentra registrado' });

        const verificationCode = generateVerificationCode();

        const newUser = new User({ name, lastname, email, password });

        newUser.password = await newUser.encryptPassword(password);
        newUser.verificationCode = verificationCode;
        newUser.codeExpiry = new Date(Date.now() + 10 * 60 * 1000);

        await newUser.save();

        sendVerificationMail(newUser.email, verificationCode);

        setTimeout(
            async () => {
                const { _id } = newUser;
                const userInDb = await User.findById(_id);
                if (!userInDb?.confirmEmail) await User.deleteOne({ _id });
            },
            3 * 60 * 1000,
        );

        res.status(201).json({
            res: 'Registro exitoso, confirme su correo para iniciar sesión',
            newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const confirmEmail = async (req, res) => {
    const { email, code } = req.body;

    try {
        const userBDD = await User.findOne({ email });

        if (!userBDD)
            return res.status(400).json({ res: 'Usuario no encontrado' });

        if (
            userBDD.verificationCode !== code ||
            userBDD.codeExpiry < Date.now()
        )
            return res.status(400).json({ res: 'Código invalido o expirado' });

        userBDD.verificationCode = null;
        userBDD.codeExpiry = null;
        userBDD.confirmEmail = true;
        userBDD.codePasswordUsed = true;

        await userBDD.save();

        setTimeout(
            async () => {
                userBDD.codePasswordUsed = false;
                await userBDD.save();
            },
            2 * 60 * 1000,
        );

        res.status(200).json({ res: 'Correo verificado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const configureClientProfile = async (req, res) => {
    try {
        const {
            body: { genre, weight, height, age, levelactivity, days, coach_id },
            userBDD: { _id: user_id, name, lastname, email },
        } = req;

        if (Object.values(req.body).includes(''))
            return res.status(400).json({
                res: 'Rellene todos los campos antes de enviar la solicitud',
            });

        if (await Client.exists({ user_id }))
            return res.status(400).json({ res: 'El perfil ya ha sido creado' });

        const coach = await Coach.findOne({ _id: coach_id });

        if (!coach) return res.status(404).json({ res: 'El coach no existe' });

        const newClient = new Client({
            user_id,
            genre,
            weight,
            height,
            age,
            levelactivity,
            days,
            coach_id,
            progress: [],
        });

        const { _id: client_id } = newClient;

        const initialProgress = await Progress.create({
            client_id,
            currentWeight: weight,
            observations: 'Inicio del Perfil',
        });

        newClient.progress.push(initialProgress);
        await newClient.save();

        coach.clientes.push(client_id);
        await coach.save();

        newClient.user_id = { user_id, name, lastname, email };
        newClient.coach_id._id = coach_id;

        res.status(201).json({ res: 'Perfil creado correctamente', newClient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewRoutineForClient = async (req, res) => {
    try {
        const { _id } = await Client.findOne({ user_id: req.userBDD._id });

        if (!_id) return res.status(404).json({ res: 'Cliente no encontrado' });

        const routine = await Routine.find({ client_id: _id })
            .populate('client_id', 'name lastname')
            .populate('coach_id', 'name lastname')
            .populate('days.exercises', '-__v');

        if (!routine)
            return res
                .status(404)
                .json({ res: 'No hay rutina asignada para este cliente' });

        res.status(200).json({ res: 'Rutina encontrada', routine });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewClientProfile = async (req, res) => {
    try {
        const { _id: user_id } = req.userBDD;

        const client = await Client.findOne({ user_id })
            .populate('user_id', 'name lastname email')
            .populate({
                path: 'coach_id',
                populate: { path: 'user_id', select: 'name lastname email' },
            })
            .populate({
                path: 'progress',
                select: 'currentWeight observations start_date',
                options: { sort: { start_date: -1 }, limit: 1 },
            });

        if (!client)
            return res
                .status(404)
                .json({ res: 'Perfil de cliente no encontrado' });

        // const clientResponse = {
        //     _id: client._id,
        //     genre: client.genre,
        //     weight: client.weight,
        //     height: client.height,
        //     age: client.age,
        //     levelactivity: client.levelactivity,
        //     days: client.days,
        //     progress: client.progress,
        //     user: client.user_id,
        //     coach: client.coach_id
        //         ? {
        //                 _id: client.coach_id._id,
        //                 name: client.coach_id.user_id?.name || 'No definido',
        //                 lastname: client.coach_id.user_id?.lastname || 'No definido',
        //                 email: client.coach_id.user_id?.email || 'No definido',
        //             }
        //         : null,
        // };

        res.status(200).json({
            res: 'Perfil de cliente encontrado',
            client,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewAllClients = async (_, res) => {
    try {
        const clients = await Client.find()
            .populate('user_id', 'name lastname email status')
            .populate('coach_id', 'user_id');
        // .populate({
        //     path: 'progress',
        //     select: 'currentWeight observations start_date',
        // });

        if (!clients.length)
            return res.status(404).json({ res: 'No hay clientes registrados' });

        const clientData = clients.map((client) => {
            client.client_id = client._id;
            client.name = client.user_id.name;
            client.lastname = client.user_id.lastname;
            client.email = client.user_id.email;
            client.status = client.user_id.status;
            client.email = client.user_id.email;
            client.coach_id = client.coach_id._id;
            client.coach_name = client.coach_id.name;

            return client;
        });

        res.status(200).json({
            res: 'Clientes encontrados',
            clients: clientData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { clientID } = req.params;

        const client = await Client.findById(clientID);

        if (!client)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        const user = await User.findById(client.user_id);

        if (user) {
            user.status = false;
            await user.save();
        }

        const coach = await Coach.findById(client.coach_id);

        coach.clientes = coach.clientes.filter((id) => id !== client._id);

        await coach.save();
        await client.deleteOne();

        res.status(200).json({ res: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const updateClientProfile = async (req, res) => {
    try {
        const {
            body: {
                user_id: { name, lastname, email },
                genre,
                weight,
                height,
                age,
                levelactivity,
                days,
            },
            userBDD: { _id: user_id },
        } = req;

        if (
            !name ||
            !lastname ||
            !email ||
            !genre ||
            !weight ||
            !height ||
            !age ||
            !levelactivity ||
            !days
        ) {
            return res
                .status(400)
                .json({ res: 'Rellene todos los campos obligatorios' });
        }

        const user = await User.findByIdAndUpdate(
            user_id,
            { name, lastname, email },
            { new: true, runValidators: true },
        );

        if (!user)
            return res.status(404).json({ res: 'Usuario no encontrado' });

        const client_id = await Client.exists({ user_id });

        if (!client_id)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        const client = await Client.findByIdAndUpdate(
            client_id,
            { genre, weight, height, age, levelactivity, days },
            { new: true, runValidators: true },
        );

        // Sí el cliente actualizo los días de entrenamiento
        // days = ['lunes', 'martes']

        if (days.length !== client.days.length) {
            const routines = await Routine.find({ client_id });
            const updatedRoutines = routines.map((routine) => {
                routine.days = days.map((day) => {
                    const existingDay = routine.days.find(
                        (obj) => obj.day === day,
                    );

                    if (existingDay) return existingDay;

                    return { day, exercises: [] };
                });
                return routine;
            });

            await Routine.deleteMany({ client_id });
            await Routine.insertMany(updatedRoutines);
        }

        res.status(200).json({
            res: 'Perfil actualizado correctamente',
            user,
            client,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const getTrainingReminders = async (req, res) => {
    try {
        const { _id: user_id } = req.userBDD;

        const client = await Client.findOne({ user_id });

        if (!client)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        res.status(200).json({
            res: 'Dias de entrenamiento obtenidos',
            days: client.days,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const restorePasswordClient = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        const verificationCode = generateVerificationCode();

        user.verificationCode = verificationCode;
        user.codeExpiry = Date.now() + 10 * 60 * 1000;

        await user.save();
        sendVerificationMail(user.email, verificationCode);

        res.status(200).json({ res: 'Correo de verificación enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const newPasswordClient = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!password || !confirmPassword)
        return res.status(400).json({
            res: 'Rellene todos los campos antes de enviar la solicitud',
        });

    if (password !== confirmPassword)
        return res.status(400).json({ res: 'Las contraseñas no coinciden' });

    if (password.length < 8)
        return res.status(400).json({ res: 'La contraseña debe tener al menos 8 caracteres' });

    if (!password.match(/[a-z]/) || !password.match(/[A-Z]/))
        return res.status(400).json({ res: 'La contraseña debe contener al menos una letra mayúscula y una letra minúscula' });

    if (!password.match(/\d/) || !password.match(/[!@#$%^&*]/))
        return res.status(400).json({ res: 'La contraseña debe contener al menos un número y un caracter especial' });

    try {
        const user = await User.findOne({ email });

        if (!user)
            return res.status(404).json({ res: 'Usuario no encontrado' });

        if (!user.codePasswordUsed)
            return res
                .status(400)
                .json({ res: 'Correo no verificado o codigo expirado' });
    

        user.password = await user.encryptPassword(password);
        user.codePasswordUsed = false;

        await user.save();

        res.status(200).json({ res: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const tokenNotification = async (req, res) => {
    const { token } = req.body;
    const { _id: user_id } = req.userBDD;

    try {
        const client = await Client.findOne({ user_id });

        if (!client)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        client.notificationToken = token;

        await client.save();

        res.status(200).json({
            res: 'Token de notificación actualizado con éxito',
        });
    } catch (error) {
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};
