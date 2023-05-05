import { Schema } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';

import AbstractODM from './AbstractODM';

export default class MotorcycleShopODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>(
      {
        id: { type: String, required: false },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        status: { type: Boolean, required: true },
        buyValue: { type: Number, required: true },
        engineCapacity: { type: Number, required: true },
        category: { type: String, required: true },
      },
      {
        toJSON: {
          transform(doc, ret) {
            const transformed = {
              id: ret._id,
              buyValue: ret.buyValue,
              color: ret.color,
              model: ret.model,
              year: ret.year,
              status: ret.status,
              engineCapacity: ret.engineCapacity,
              category: ret.category,
            };
            return transformed;
          },
        },
      },
    );
    super(schema, 'motorcycles');
  }
}