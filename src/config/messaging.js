import Chat from '../models/chat.js';
import { Server } from 'socket.io';
import { server } from '../server.js';

export const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

export const socketToMessaging = () => {
    io.on('connection', (socket) => {
        socket.on('join', (transmitter) => {
            socket.join(transmitter);
        })
        console.log('Client connected');
        socket.on('send', async (message) => {
            console.log(message);

            await Chat.create(message);
            io.to(message.receiver).emit("receive", message);
        });
    });
};
