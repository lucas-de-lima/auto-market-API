import express from 'express';
import CarsControllers from '../Controllers/CarsControllers';

const carsRouter = express.Router();

const carsControllers = new CarsControllers();

carsRouter.post('/', carsControllers.create);
carsRouter.get('/', carsControllers.getAll);
carsRouter.get('/:id', carsControllers.getById);
carsRouter.put('/:id', carsControllers.updateById);

export default carsRouter;