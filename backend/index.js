import express from 'express';
import cors from 'cors';
import profileroutes from './routes/profile.routes.js';
import { createTable } from './config/db.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/profiles', profileroutes);

const PORT = 5000;

const startServer = async () => {
    try {
        await createTable();
        console.log('Database table initialized');
    } catch (error) {
        console.error('Failed to initialize database table:', error);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();

// Keep event loop active
setInterval(() => {}, 60000);


