import express from 'express';
import MotorcyclesControllers from '../Controllers/MotorcyclesControllers';

const motorcycles = express.Router();

const motorcyclesControllers = new MotorcyclesControllers();

motorcycles.post('/', motorcyclesControllers.create);
motorcycles.get('/', motorcyclesControllers.getAll);
motorcycles.get('/:id', motorcyclesControllers.getById);
motorcycles.put('/:id', motorcyclesControllers.updateById);
motorcycles.delete('/:id', motorcyclesControllers.removeById);

export default motorcycles;