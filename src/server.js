import express from 'express';
import cors from 'cors';
import routerUsers from './routers/users.routes.js';
import routerCoach from './routers/coach.routes.js';
import routerClient from './routers/client.routes.js';
import routerExercises from './routers/exercises.routes.js';
import routerRoutine from './routers/routine.routes.js';
import routerProgress from './routers/progress.routes.js';
import { createServer } from 'http';
import cron from 'node-cron';
import {startCronJobForExercises, syncExercisesOnStart} from './controllers/exercises.controller.js';
// Inicializamos
const app = express();

// Configuramos el puerto
app.use(
    cors({
        origin: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

app.use(express.json());

// Rutas
app.get('/', (_, res) => res.send('Server running'));

 

app.use('/api/v1', [
    routerUsers,
    routerCoach,
    routerClient,
    routerExercises,
    routerRoutine,
    routerProgress,
]);

app.use((_, res) => res.status(404).json({ res: '404 - Endpoint not found' }));

export const server = createServer(app);
