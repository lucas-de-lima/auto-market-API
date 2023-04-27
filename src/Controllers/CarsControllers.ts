import { NextFunction, Request, Response } from 'express';
import CarsServices from '../Services/CarsServices';
import statusCodes from './statusCodes';
import ICar from '../Interfaces/ICar';

export default class CarsControllers {
  public async create(req: Request, res: Response) {
    const carsServices = new CarsServices();
    const car: ICar = req.body;
    
    if (!car.status) { car.status = false; }
    
    const newCar = await carsServices.create(car);
    return res.status(statusCodes.CREATED).json(newCar);
  }

  public async getAll(_req: Request, res: Response) {
    const carsServices = new CarsServices();

    const cars = await carsServices.getAll();
    return res.status(statusCodes.OK).json(cars);
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const carsServices = new CarsServices();

      const car = await carsServices.getById(id);
      return res.status(statusCodes.OK).json(car);
    } catch (error) {
      next(error);
    }
  }
}