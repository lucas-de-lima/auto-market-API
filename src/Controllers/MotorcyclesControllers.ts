import { NextFunction, Request, Response } from 'express';
import statusCodes from './statusCodes';
import MotorcyclesServices from '../Services/MotorcyclesServices';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcyclesControllers {
  public async create(req: Request, res: Response) {
    const motorcyclesServices = new MotorcyclesServices();
    const motorcycle: IMotorcycle = req.body;
    
    if (!motorcycle.status) { motorcycle.status = false; }
    
    const newMotorcycle = await motorcyclesServices.create(motorcycle);
    return res.status(statusCodes.CREATED).json(newMotorcycle);
  }

  public async getAll(_req: Request, res: Response) {
    const motorcyclesServices = new MotorcyclesServices();

    const motorcycles = await motorcyclesServices.getAll();
    return res.status(statusCodes.OK).json(motorcycles);
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const motorcyclesServices = new MotorcyclesServices();

      const motorcycle = await motorcyclesServices.getById(id);
      return res.status(statusCodes.OK).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const motorcycleUpdate = req.body;
      const { id } = req.params;
      const motorcyclesServices = new MotorcyclesServices();

      const motorcycle = await motorcyclesServices.updateById(id, motorcycleUpdate);
      return res.status(statusCodes.OK).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }

  public async removeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const motorcyclesServices = new MotorcyclesServices();

      const motorcycle = await motorcyclesServices.removeById(id);
      return res.status(statusCodes.OK).json(motorcycle);
    } catch (error) {
      next(error);
    }
  }
}