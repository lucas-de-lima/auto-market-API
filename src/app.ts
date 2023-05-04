import express from 'express';
import carsRouter from './routes/cars.routes';
import ErrorHandle from './middlewares/ErrorHandler';
import motorcycles from './routes/motorcycle.routes';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);
app.use('/motorcycles', motorcycles);

app.use(ErrorHandle.handle);

export default app;
