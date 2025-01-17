import { sendMailToCoach } from '../config/nodemailer.js';
import Coach from '../models/coach.js';
import User from '../models/user.js';
import Client from '../models/client.js';
import Chat from '../models/chat.js';

export const coachRegister = async (req, res) => {
    try {
        const { name, lastname, email, description } = req.body;
        if (await User.exists({ email }))
            return res
                .status(400)
                .json({ res: 'El email ya se encuentra registrado' });

        const newUser = new User({ name, lastname, email, rol: 'entrenador' });
        const password = `RutinFit${Math.random().toString(36).slice(2)}`;

        newUser.password = await newUser.encryptPassword(password);

        const newCoach = new Coach({ user_id: newUser._id, description });

        await newUser.save();
        await newCoach.save();

        sendMailToCoach(email, password, name);

        res.status(201).json({
            res: 'Entrenador registrado correctamente',
            newUser,
            newCoach,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewCoaches = async (_, res) => {
    try {
        res.status(200).json(
            await Coach.find().populate(
                'user_id',
                'name lastname email status',
            ),
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const viewCoachById = async (req, res) => {
    try {
        const coach = await Coach.findById(req.params.id).populate(
            'user_id',
            'name lastname email status',
        );

        if (!coach)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        res.status(200).json(coach);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const updateCoach = async (req, res) => {
    const {
        body: { name, lastname, email, description },
        params: { id },
    } = req;

    // Validaciones iniciales
    if (!name || !lastname || !email || !description)
        return res.status(400).json({ res: 'Rellene todos los campos' });

    try {
        // Buscar el entrenador por ID
        if (!(await Coach.exists(id)))
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        // Actualizar descripción del entrenador
        const coach = await Coach.findByIdAndUpdate(
            id,
            { description },
            { new: true },
        ).select('_id description clientes'); // Excluir la propiedad `__v`

        // Actualizar información del usuario asociado
        const user = await User.findByIdAndUpdate(
            updateCoach.user_id,
            { name, lastname, email },
            { new: true },
        ).select('_id name lastname email rol status'); // Seleccionar campos específicos

        user.id = user._id;
        delete user._id;

        coach.id = coach._id;
        delete coach._id;

        // Construir respuesta uniforme
        res.status(200).json({
            res: 'Entrenador actualizado correctamente',
            coach,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor' });
    }
};

export const deleteCoach = async (req, res) => {
    try {
        const { id: _id } = req.params;

        const coach = await Coach.findOne({ _id });

        if (!coach)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        const { user_id } = coach;
        const user = await User.findById(user_id);

        if (!user)
            return res.status(404).json({ res: 'Usuario no encontrado' });

        await Coach.findByIdAndDelete(id);
        await User.findByIdAndDelete(user_id);

        res.status(200).json({ res: 'Entrenador eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const getClientsByCoach = async (req, res) => {
    try {
        const { _id: user_id, rol } = req.userBDD;

        if (rol !== 'entrenador')
            return res.status(403).json({
                res: 'Acceso denegado: Solo los entrenadores pueden ver a sus clientes',
            });

        const coach_id = await Coach.exists({ user_id });

        if (!coach_id)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        const clients = await Client.find({ coach_id })
            .populate('user_id', 'name lastname email status')
            .populate('progress');

        if (!clients.length) {
            return res
                .status(404)
                .json({ res: 'No hay clientes asignados a este entrenador' });
        }

        res.status(200).json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const getClientsByCoachId = async (req, res) => {
    try {
        const coach_id = await Coach.findById(req.params.coachID);
        if (!coach_id)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        const clients = await Client.find({ coach_id })
            .populate('user_id', 'name lastname email status')
            .populate('progress');

        if (!clients.length) {
            return res
                .status(404)
                .json({ res: 'No hay clientes asignados a este entrenador' });
        }

        res.status(200).json({ res: 'Clientes encontrados', clients });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const getClientByCoachById = async (req, res) => {
    try {
        const {
            userBDD: { _id: user_id },
            params: { clientID: _id },
        } = req;

        const coach_id = await Coach.exists({ user_id });

        if (!coach_id)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        const client = await Client.findOne({
            coach_id,
            _id,
        }).populate('user_id', 'name lastname email status');

        if (!client)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        res.status(200).json({ client });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewCoachProfile = async (req, res) => {
    try {
        const { _id: user_id } = req.userBDD;

        const coachProfile = await Coach.findOne({ user_id }).populate(
            'user_id',
            'name lastname email rol',
        );

        if (!coachProfile)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        const clientIDs = coachProfile.clientes.map(({ _id }) => _id);

        const clients = await Client.find({ _id: { $in: clientIDs } }).populate(
            'user_id',
            'name lastname email',
        );
        // .populate({
        //     path: 'progress',
        //     select: 'start_date currentWeight observations',
        // });

        res.status(200).json({
            coach: {
                name: coachProfile.user_id.name,
                lastname: coachProfile.user_id.lastname,
                email: coachProfile.user_id.email,
                rol: coachProfile.user_id.rol,
                description: coachProfile.description,
            },
            clients: clients.map((client) => ({
                _id: client._id,
                name: client.user_id.name,
                lastname: client.user_id.lastname,
                email: client.user_id.email,
                genre: client.genre,
                weight: client.weight,
                height: client.height,
                age: client.age,
                levelactivity: client.levelactivity,
                days: client.days,
                progress: client.progress,
            })),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const updateCoachProfile = async (req, res) => {
    try {
        const {
            userBDD: { _id: user_id },
            body: { description },
        } = req;
        const coach_id = await Coach.exists({ user_id });

        if (!coach_id)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        const updatedCoach = await Coach.findByIdAndUpdate(
            coach_id,
            { description },
            { new: true },
        );

        const updatedUser = await User.findByIdAndUpdate(user_id, req.body, {
            new: true,
        });

        res.status(200).json({
            res: 'Perfil de entrenador actualizado correctamente',
            updatedCoach,
            updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const chat = async (req, res) => {
    try {
        const { client_id, coach_id } = req.params;

        const { page = 1 , limit = 50 } = req.query;

        const client = await Client.exists({client_id});

        if (!client)
            return res.status(404).json({ res: 'Cliente no encontrado' });

        const coach = await Coach.exists({coach_id});

        if (!coach)
            return res.status(404).json({ res: 'Entrenador no encontrado' });

        // Buscar chat entre cliente y entrenador
        const chat = await Chat.find({ client_id, coach_id })
            .limit(limit)
            .skip((page - 1) * limit);
        
        const count = await Chat.countDocuments({ client_id, coach_id });
        

        res.status(200).json({
            res: 'Chat encontrado',
            totalPages: Math.ceil(count / limit),
            chat,
            currentPage: page,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};
