import statusCodes from '../utils/statusCodes';
import ICar from '../Interfaces/ICar';
import CarShopODM from '../Models/CarShopODM';
import CustomError from '../utils/CustomError';

export default class CarsServices {
  private static readonly CAR_NOT_FOUND = 'Car not found';

  public async getAll(): Promise <ICar[] | null> {
    const carODM = new CarShopODM();
    const cars = await carODM.getAll();
    return cars;
  }
    
  public async getById(id: string): Promise <ICar | null> {
    const carODM = new CarShopODM();
    const car = await carODM.getById(id);

    if (!car) { throw new CustomError(statusCodes.NOT_FOUND, CarsServices.CAR_NOT_FOUND); }
    return car;
  }
  
  public async create(car: ICar) {
    const carODM = new CarShopODM();
    const newCar = await carODM.create(car);
    return newCar;
  }

  public async updateById(id: string, carUpdate: Partial<ICar>): Promise <ICar | null> {
    const carODM = new CarShopODM();
    const car = await carODM.updateById(id, carUpdate);

    if (!car) { throw new CustomError(statusCodes.NOT_FOUND, CarsServices.CAR_NOT_FOUND); }
    return car;
  }

  public async removeById(id: string): Promise<void> {
    const carODM = new CarShopODM();
    try {
      await carODM.removeById(id);
    } catch (error) {
      throw new CustomError(statusCodes.NOT_FOUND, CarsServices.CAR_NOT_FOUND);
    }
  }
}
