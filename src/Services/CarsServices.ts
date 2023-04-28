import statusCodes from '../Controllers/statusCodes';
import ICar from '../Interfaces/ICar';
import CarShopODM from '../Models/CarShopODM';
import CustomError from '../utils/CustomError';

export default class CarsServices {
  public async getAll(): Promise <ICar[] | null> {
    const carODM = new CarShopODM();
    const cars = await carODM.getAll();
    return cars;
  }
    
  public async getById(id: string): Promise <ICar | null> {
    const carODM = new CarShopODM();
    const car = await carODM.getById(id);

    if (!car) { throw new CustomError(statusCodes.NOT_FOUND, 'Car not found'); }
    return car;
  }
  
  public async create(car: ICar) {
    const carODM = new CarShopODM();
    const newCar = await carODM.create(car);
    return newCar;
  }

  public async updateById(id: string): Promise <ICar | null> {
    const carODM = new CarShopODM();
    const car = await carODM.updateById(id);

    if (!car) { throw new CustomError(statusCodes.NOT_FOUND, 'Car not found'); }
    return car;
  }
}
