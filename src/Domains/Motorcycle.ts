import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private _category: 'Street' | 'Custom' | 'Trail';
  private _engineCapacity: number;
  
  constructor(motorcycle: IMotorcycle) {
    super(
      motorcycle.id, 
      motorcycle.model,
      motorcycle.status || false,
      motorcycle.color,
      motorcycle.year,
      motorcycle.buyValue,
    );
    this._category = motorcycle.category;
    this._engineCapacity = motorcycle.engineCapacity;
  }
}