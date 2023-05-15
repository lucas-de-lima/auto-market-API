import sinon from 'sinon';
import { expect, assert } from 'chai';
import CarsServices from '../../../src/Services/CarsServices';
import CarShopODM from '../../../src/Models/CarShopODM';
import CustomError from '../../../src/utils/CustomError';
import statusCodes from '../../../src/utils/statusCodes';
import ICar from '../../../src/Interfaces/ICar';

const CAR_NOT_FOUND = 'Car not found';

describe('CarsServices', function () {
  describe('getAll', function () {
    it('should return all cars', async function () {
      const cars: ICar[] = [
        {
          model: 'Car 1',
          year: 2021,
          color: 'Red',
          buyValue: 20000,
          doorsQty: 4,
          seatsQty: 5,
        },
        {
          model: 'Car 2',
          year: 2022,
          color: 'Blue',
          buyValue: 25000,
          doorsQty: 2,
          seatsQty: 2,
        },
      ];

      const getAllStub = sinon.stub(CarShopODM.prototype, 'getAll').resolves(cars);

      const result = await new CarsServices().getAll();

      expect(result).to.deep.equal(cars);

      getAllStub.restore();
    });
  });

  describe('getById', function () {
    it('should return a car by id', async function () {
      const car: ICar = {
        id: '1',
        model: 'Car 1',
        year: 2021,
        color: 'Red',
        buyValue: 20000,
        doorsQty: 4,
        seatsQty: 5,
      };

      const getByIdStub = sinon.stub(CarShopODM.prototype, 'getById').resolves(car);

      const result = await new CarsServices().getById('1');

      expect(result).to.deep.equal(car);

      getByIdStub.restore();
    });

    it('should throw a CustomError when car is not found(1)', async function () {
      const getByIdStub = sinon.stub(CarShopODM.prototype, 'getById').resolves(null);

      let errorCaught = false;
      try {
        await new CarsServices().getById('999');
      } catch (error) {
        errorCaught = true;
        const customError = error as CustomError;
        expect(customError.status).to.equal(statusCodes.NOT_FOUND);
        expect(customError.message).to.equal(CAR_NOT_FOUND);
      }

      assert.isTrue(errorCaught, 'Expected error to be caught(1)');

      getByIdStub.restore();
    });
  });

  describe('create', function () {
    it('should create a new car', async function () {
      const car: ICar = {
        model: 'Car 1',
        year: 2021,
        color: 'Red',
        buyValue: 20000,
        doorsQty: 4,
        seatsQty: 5,
      };

      const createStub = sinon.stub(CarShopODM.prototype, 'create').resolves(car);

      const result = await new CarsServices().create(car);

      expect(result).to.deep.equal(car);

      createStub.restore();
    });
  });

  describe('updateById', function () {
    it('should update a car by id', async function () {
      const car: ICar = {
        id: '1',
        model: 'Car 1',
        year: 2021,
        color: 'Red',
        buyValue: 20000,
        doorsQty: 4,
        seatsQty: 5,
      };
  
      const updateByIdStub = sinon.stub(CarShopODM.prototype, 'updateById').resolves(car);
  
      const result = await new CarsServices().updateById('1', car);
  
      expect(result).to.deep.equal(car);
  
      updateByIdStub.restore();
    });
  
    it('should throw a CustomError when car is not found(2)', async function () {
      const updateByIdStub = sinon.stub(CarShopODM.prototype, 'updateById').resolves(null);
      const car: ICar = {
        id: '1',
        model: 'Car 1',
        year: 2021,
        color: 'Red',
        buyValue: 20000,
        doorsQty: 4,
        seatsQty: 5,
      };
  
      let errorCaught = false;
      try {
        await new CarsServices().updateById('1', car);
      } catch (error) {
        errorCaught = true;
        const customError = error as CustomError;
        expect(customError.status).to.equal(statusCodes.NOT_FOUND);
        expect(customError.message).to.equal(CAR_NOT_FOUND);
      }
  
      assert.isTrue(errorCaught, 'Expected error to be caught');
  
      updateByIdStub.restore();
    });
  });

  describe('removeById', function () {
    let removeByIdStub: sinon.SinonStub<[id: string], Promise<ICar | null>>;
    let carService: CarsServices;

    beforeEach(function () {
      removeByIdStub = sinon.stub(CarShopODM.prototype, 'removeById');
      carService = new CarsServices();
    });

    afterEach(function () {
      removeByIdStub.restore();
    });

    it('should remove a car by id', async function () {
      await carService.removeById('1');
      sinon.assert.calledWith(removeByIdStub, '1');
    });

    it('should throw a CustomError when car is not found(3)', async function () {
      removeByIdStub.rejects(new CustomError(statusCodes.NOT_FOUND, CAR_NOT_FOUND));

      let errorCaught = false;
      try {
        await carService.removeById('1');
      } catch (error) {
        errorCaught = true;
        const customError = error as CustomError;
        expect(customError.status).to.equal(statusCodes.NOT_FOUND);
        expect(customError.message).to.equal(CAR_NOT_FOUND);
      }

      assert.isTrue(errorCaught, 'Expected error to be caught');

      sinon.assert.calledWith(removeByIdStub, '1');
    });
  });
});
