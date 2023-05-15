import statusCodes from '../utils/statusCodes';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleShopODM from '../Models/MotorcycleShopODM';
import CustomError from '../utils/CustomError';

export default class MotorcyclesServices {
  private static readonly MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';

  public async getAll(): Promise <IMotorcycle[] | null> {
    const motorcyclesODM = new MotorcycleShopODM();
    const motorcycles = await motorcyclesODM.getAll();
    return motorcycles;
  }
    
  public async getById(id: string): Promise <IMotorcycle | null> {
    const motorcyclesODM = new MotorcycleShopODM();
    const car = await motorcyclesODM.getById(id);

    if (!car) {
      throw new CustomError(statusCodes.NOT_FOUND, MotorcyclesServices.MOTORCYCLE_NOT_FOUND); 
    }
    return car;
  }
  
  public async create(motorcycle: IMotorcycle) {
    const motorcyclesODM = new MotorcycleShopODM();
    const newCar = await motorcyclesODM.create(motorcycle);
    return newCar;
  }

  public async updateById(
    id: string,
    motorcycleUpdate: Partial<IMotorcycle>,
  ): Promise <IMotorcycle | null> {
    const motorcyclesODM = new MotorcycleShopODM();
    const motorcycle = await motorcyclesODM.updateById(
      id,
      motorcycleUpdate,
    );

    if (!motorcycle) {
      throw new CustomError(
        statusCodes.NOT_FOUND,
        MotorcyclesServices.MOTORCYCLE_NOT_FOUND,
      );
    }
    return motorcycle;
  }

  public async removeById(id: string): Promise<void> {
    const motorcyclesODM = new MotorcycleShopODM();
    try {
      await motorcyclesODM.removeById(id);
    } catch (error) {
      throw new CustomError(
        statusCodes.NOT_FOUND,
        MotorcyclesServices.MOTORCYCLE_NOT_FOUND,
      );
    }
  }
}
