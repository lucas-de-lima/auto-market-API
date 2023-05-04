import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    super(
      car.id,
      car.model,
      car.status || false,
      car.color,
      car.year,
      car.buyValue,
    );
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}
