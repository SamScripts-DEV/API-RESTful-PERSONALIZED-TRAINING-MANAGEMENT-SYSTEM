import { schedule } from 'node-cron';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Client from '../models/client.js';
import { Expo } from 'expo-server-sdk';

export const startCronJob = (_) => {
    const expo = new Expo();

    const removeAccents = (str) => {
        return str
            .normalize('NFD') // Normaliza la cadena en forma de descomposición
            .replace(/[\u0300-\u036f]/g, ''); // Elimina los caracteres de acento
    };

    const checkTrainingReminders = async () => {
        try {
            const today = format(new Date(), 'EEEE', {
                locale: es,
            }).toLowerCase();
            const normalizedToday = removeAccents(today);

            console.log(
                `Iniciando la verificación de recordatorios para el día: ${today}`,
            );

            const clients = await Client.find({
                days: normalizedToday,
            }).populate('user_id', 'name email');
            

            if (clients.length === 0) {
                console.log(
                    `No se encontraron clientes que entrenen hoy (${today}).`,
                );
                return;
            }

            const mensajes = [];
            clients.forEach((client) => {
                const {
                    user_id: { name, _id: userId },
                    notificationToken,
                } = client;
                
                if (Expo.isExpoPushToken(notificationToken)) {
                    mensajes.push({
                        to: notificationToken,
                        sound: 'default',
                        title: '¡Es hora de tu entrenamiento!',
                        body: `¡Hola ${name}! Recuerda que hoy es uno de tus días de entrenamiento (${today}).`,
                        data: { userId },
                    });
                }

                // console.log(
                //   `Hoy es ${today}. Recordatorio enviado a: ${name}`
                // );

                // io.emit("reminder", {
                //   name,
                //   email,
                //   day: today,
                // });
            });

            const chunks = expo.chunkPushNotifications(mensajes);
            for (const chunk of chunks) {
                const result = await expo.sendPushNotificationsAsync(chunk);
            }

            console.log('Notificaciones enviadas con éxito');
        } catch (error) {
            console.error('Error al verificar recordatorios:', error);
        }
    };

    schedule('* 7 * * *', checkTrainingReminders, {
        timezone: 'America/Guayaquil',
    });

    console.log(
        'Cron job programado para enviar recordatorios de entrenamiento diariamente a las 7:00 AM.',
    );
};
