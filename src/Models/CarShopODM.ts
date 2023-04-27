import { Model, Schema, isValidObjectId, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CustomError from '../utils/CustomError';
import statusCodes from '../Controllers/statusCodes';

class CarShopODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>(
      {
        id: { type: String, required: false },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        status: { type: Boolean, required: true },
        buyValue: { type: Number, required: true }, 
        doorsQty: { type: Number, required: true },
        seatsQty: { type: Number, required: true },
      },
      {
        toJSON: {
          transform(doc, ret) {
            const transformed = {
              id: ret._id,
              buyValue: ret.buyValue,
              seatsQty: ret.seatsQty,
              doorsQty: ret.doorsQty,
              color: ret.color,
              model: ret.model,
              year: ret.year,
              status: ret.status,
            };
            return transformed;
          },
        },
      },
    );

    this.model = models.Cars || model('Cars', this.schema);
  }

  public async create(car: ICar): Promise <ICar> {
    const modelTest = await this.model.create({ ...car });    
    return modelTest;
  }

  public async getAll(): Promise <ICar[]> {
    const cars = await this.model.find();
    return cars;
  }

  public async getById(id: string): Promise <ICar | null> {
    if (!isValidObjectId(id)) { 
      throw new CustomError(statusCodes.UNPROCESSABLE_ENTITY, 'Invalid mongo id'); 
    }

    const car = await this.model.findById(id);
    return car;
  }
}
export default CarShopODM;