import Client from '../models/client.js';
import Progress from '../models/progress.js';
import { Types } from 'mongoose';

export const createProgress = async (req, res) => {
    try {
        const { userBDD: { _id: user_id }, body: { currentWeight, observations="" } } = req;
        const client_id = await Client.exists({ user_id });
        const client = await Client.findOne({ user_id});

        if (!currentWeight)
            return res
                .status(400)
                .json({ res: 'El peso actual son obligatorios' });

        if (!client_id)
            return res.status(400).json({ res: 'El cliente no existe' });

        const lastProgress = await Progress.findOne({ client_id })
            .sort({ start_date: -1 })
            .limit(1);

        let message = 'Primer registro de peso';
        if (lastProgress) {
            const weightDifference = currentWeight - lastProgress.currentWeight;

            if (weightDifference > 0) {
                message = `El cliente ha subido ${weightDifference}kg`;
            } else if (weightDifference < 0) {
                message = `El cliente ha bajado ${Math.abs(weightDifference)}kg`;
            } else {
                message = 'El cliente ha mantenido su peso';
            }
        }

        const newProgress = new Progress({
            client_id,
            currentWeight,
            observations,
            start_date: new Date(),
        });

        await newProgress.save();

        await Client.findByIdAndUpdate(
            client._id,
            {
                $push: {progress: newProgress._id},
                weight: currentWeight
            },
            {new: true}
        )

        res.status(201).json({
            res: 'Progreso creado correctamente',
            newProgress,
            message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewProgressById = async (req, res) => {
    try {
        const progress = await Progress.findById(req.params.id).populate(
            'client_id',
            'name',
        );
        
        if (!progress)
            return res.status(404).json({ res: 'Progreso no encontrado' });

        res.status(200).json({ res: 'Progreso encontrado', progress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const viewAllProgressByClientId = async (req, res) => {
    try {
        const { client_id } = req.params;

        const progress = await Progress.find({ client_id }).sort({
            start_date: -1,
        });

        if (!progress.length)
            return res
                .status(404)
                .json({ res: 'No hay progresos registrados' });

        res.status(200).json({ res: 'Progresos encontrados', progress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const updateProgress = async (req, res) => {
    try {
        const { body: { currentWeight, observations }, params: { id } } = req;
        
        if (!currentWeight)
            return res
                .status(400)
                .json({ res: 'El peso actual es obligatorio' });

        const updateProgress = await Progress.findByIdAndUpdate(
            id,
            { currentWeight, observations },
            { new: true, runValidators: true },
        );

        if (!updateProgress)
            return res.status(404).json({ res: 'Progreso no encontrado' });

        res.status(200).json({
            res: 'Progreso actualizado correctamente',
            updateProgress,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};

export const deleteProgress = async (req, res) => {
    try {
        const deleteProgress = await Progress.findByIdAndDelete(req.params.id);
        
        if (!deleteProgress)
            return res.status(404).json({ res: 'Progreso no encontrado' });

        res.status(200).json({
            res: 'Progreso eliminado correctamente',
            deleteProgress,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ res: 'Error en el servidor', error });
    }
};