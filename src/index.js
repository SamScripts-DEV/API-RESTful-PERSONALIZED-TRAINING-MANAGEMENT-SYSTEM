import 'dotenv/config';
import { server } from './server.js';
import { connectionToDatabase } from './database.js';
import { socketToMessaging } from './config/messaging.js';
import { startCronJob } from './utils/cronJobs.js';
const { PORT = 4001 } = process.env;

connectionToDatabase();

socketToMessaging();

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    startCronJob(server);
});
