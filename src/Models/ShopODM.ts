import { Model, Schema, UpdateQuery, isValidObjectId, model, models } from 'mongoose';
import CustomError from '../utils/CustomError';
import statusCodes from '../Controllers/statusCodes';
import IVehicle from '../Interfaces/IVehicle';

export default abstract class ShopODM<T> {
  protected static readonly INVALID_MONGO_ID = 'Invalid mongo id';

  protected schema: Schema;
  protected model: Model<T>;
    
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, schema);
  }
    
  public async create(param: T): Promise<T> {
    return this.model.create({ ...param });
  }
    
  public async findAll(): Promise<T[]> {
    return this.model.find({}, { __v: false });
  }
    
  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        statusCodes.UNPROCESSABLE_ENTITY,
        ShopODM.INVALID_MONGO_ID,
      );
    }
    const response = await this.model.findOne({ _id: id }, { __v: false });
    return response as T;
  }
    
  public async update(id: string, param: T): Promise<T | null> {
    if (!isValidObjectId(id)) {
      throw new CustomError(
        statusCodes.UNPROCESSABLE_ENTITY, 
        ShopODM.INVALID_MONGO_ID,
      );
    }
    await this.model.findByIdAndUpdate({ _id: id }, { ...param as UpdateQuery<T> });
    return this.findById(id);
  }

  public async updateById(id: string, dataUpdate: Partial<IVehicle>): Promise <T | null> {
    if (!isValidObjectId(id)) { 
      throw new CustomError(statusCodes.UNPROCESSABLE_ENTITY, ShopODM.INVALID_MONGO_ID); 
    }

    const response = await this.model.findByIdAndUpdate(
      id,
      dataUpdate,
      { new: true },
    );    
    return response;
  }

  public async removeById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) { 
      throw new CustomError(statusCodes.UNPROCESSABLE_ENTITY, ShopODM.INVALID_MONGO_ID); 
    }

    const response = await this.model.findByIdAndRemove(id);
    return response;
  }

  public async getAll(): Promise <T[]> {
    const cars = await this.model.find();
    return cars;
  }

  public async getById(id: string): Promise <T | null> {
    if (!isValidObjectId(id)) { 
      throw new CustomError(statusCodes.UNPROCESSABLE_ENTITY, ShopODM.INVALID_MONGO_ID); 
    }

    const car = await this.model.findById(id);
    return car;
  }
}
