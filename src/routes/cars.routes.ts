import express from 'express';
import CarsControllers from '../Controllers/CarsControllers';

const carsRouter = express.Router();

const carsControllers = new CarsControllers();

carsRouter.post('/', carsControllers.create);

export default carsRouter;