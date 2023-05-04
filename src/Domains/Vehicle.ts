export default class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected status: boolean;
  protected color: string;
  protected buyValue: number;
    
  constructor(
    id: string | undefined,
    model: string,
    status: boolean,
    color: string,
    year: number,
    buyValue: number,
  ) {
    this.id = id;
    this.model = model;
    this.status = status || false;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
  }
}