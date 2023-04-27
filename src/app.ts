import express from 'express';
import carsRouter from './routes/cars.routes';
import ErrorHandle from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);

app.use(ErrorHandle.handle);

export default app;
