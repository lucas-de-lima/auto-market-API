import express from 'express';
import carsRouter from './routes/cars.routes';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);

export default app;
