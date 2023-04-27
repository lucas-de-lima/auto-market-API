import ICar from '../Interfaces/ICar';
import CarShopODM from '../Models/CarShopODM';

export default class CarsServices {
  //   public getAll = async () => {
    
  //   };
    
  // public getById = async (id) => {
  
  // };
  
  public async create(car: ICar) {
    const carODM = new CarShopODM();
    const newCar = await carODM.create(car);
    return newCar;
  }
  
  //   public update = async (product, id) => {
  
  //   };
  
  // public remove = async (id) => {
  
  // };
}
