import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarShopODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>(
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
    super(schema, 'Car');
  }
}
