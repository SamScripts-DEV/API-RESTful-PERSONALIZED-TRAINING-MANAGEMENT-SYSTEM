import Routine from '../models/routine.js';
import { Types } from 'mongoose';
import Client from '../models/client.js';
import Coach from '../models/coach.js';

export const createRoutine = async (req, res) => {
    try {
        const { 
            client_id, 
            days, 
            comments, 
            start_date, 
            end_date, 
            nameRoutine 
        } = req.body;
        const { _id: user_id } = req.userBDD;

        if (Object.values(req.body).includes(''))
            return res.status(400).json({
                res: 'Rellene todos los campos antes de enviar la solicitud',
            });

        if (!days.length)
            return res
                .status(400)
                .json({ res: 'Los días deben ser un arreglo de objetos' });

        if (!(await Client.exists({ _id: client_id })))
            return res.status(400).json({ res: 'El cliente no existe' });

        const coach_id = await Coach.exists({ user_id });

        if (!coach_id)
            return res.status(400).json({
                res: 'El usuario no es un coach, no puede asignar rutinas a los clientes',
            });

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
            return res
                .status(400)
                .json({ res: 'Las fechas deben tener un formato válido' });

        const durationDays = Math.ceil(
            (endDate - startDate) / (1000 * 3600 * 24),
        );

        if (durationDays < 0)
            return res.status(400).json({
                res: 'La fecha de finalización debe ser posterior a la fecha de inicio',
            });

        const currenDate = new Date();

        const newRoutine = new Routine({
            client_id,
            coach_id,
            days,
            comments,
            nameRoutine,
            assignment_date: Date.now(),
            start_date: startDate,
            end_date: endDate,
            durationDays,
            completed: currenDate - endDate >= 0,
        });

        await newRoutine.save();

        res.status(201).json({
            res: 'Rutina creada correctamente',
            newRoutine,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewAllRoutines = async (_, res) => {
    try {
        const routines = await Routine.find()
            .populate('client_id', 'name')
            .populate('coach_id', 'name')
            .populate('days.exercises')
            .lean();

        if (routines.length === 0)
            return res.status(404).json({ res: 'No hay rutinas registradas' });

        res.status(200).json({
            res: 'Rutinas encontradas',
            routines,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewRoutineById = async (req, res) => {
    try {
        const routine = await Routine.findById(req.params.id)
            .populate('client_id', 'name')
            .populate('coach_id', 'name')
            .populate('days.exercises')
            .lean();

        if (!routine)
            return res.status(404).json({ res: 'Rutina no encontrada' });

        res.status(200).json({
            res: 'Rutina encontrada',
            routine,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const updateRoutine = async (req, res) => {
    try {
        const {
            body: { days, comments, start_date, end_date, nameRoutine },
            params: { id },
        } = req;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
            return res
                .status(400)
                .json({ res: 'Las fechas deben tener un formato válido' });

        if (startDate >= endDate)
            return res.status(400).json({
                res: 'La fecha de inicio debe ser anterior a la fecha final',
            });

        if (!days.length)
            return res
                .status(400)
                .json({ res: 'Los días deben ser un arreglo de objetos' });

        const duration_days = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24),
        );

        const updatedRoutine = await Routine.findByIdAndUpdate(
            id,
            {
                days,
                comments,
                start_date: startDate,
                end_date: endDate,
                nameRoutine,
                duration_days,
            },
            { new: true, runValidators: true },
        );

        await updatedRoutine.save();

        res.status(200).json({
            res: 'Rutina actualizada',
            updatedRoutine: updatedRoutine,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const deleteRoutine = async (req, res) => {
    try {
        const deletedRoutine = await Routine.findByIdAndDelete(req.params.id);

        res.status(200).json({ res: 'Rutina eliminada', deletedRoutine });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewRoutinesByClientId = async (req, res) => {
    try {
        const { clientId: client_id } = req.params;

        const routines = await Routine.find({ client_id })
            .populate('client_id', 'name lastname')
            .populate('coach_id', 'name lastname')
            .populate('days.exercises')
            .lean();

        if (!routines.length)
            return res
                .status(404)
                .json({ res: 'No hay rutinas encontradas para este cliente' });

        res.status(200).json({
            res: 'Rutinas encontradas',
            routines,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};
