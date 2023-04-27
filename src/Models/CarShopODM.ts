import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

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
}
export default CarShopODM;