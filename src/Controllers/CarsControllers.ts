import { Request, Response } from 'express';
import CarsServices from '../Services/CarsServices';
import statusCodes from './statusCodes';
import ICar from '../Interfaces/ICar';

export default class CarsControllers {
  constructor(private carsServices = new CarsServices()) {}
  public create = async (req: Request, res: Response) => {
    console.log('Controller');
    
    const car: ICar = req.body;
    if (!car.status) { car.status = false; }
    const newCar = await this.carsServices.create(car);
    console.log(newCar);
    return res.status(statusCodes.CREATED).json(newCar);
  };
}