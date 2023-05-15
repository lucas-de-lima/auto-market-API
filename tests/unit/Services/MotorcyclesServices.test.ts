import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MotorcyclesServices from '../../../src/Services/MotorcyclesServices';
import MotorcycleShopODM from '../../../src/Models/MotorcycleShopODM';
import CustomError from '../../../src/utils/CustomError';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import statusCodes from '../../../src/utils/statusCodes';

chai.use(chaiAsPromised);
// const { expect } = chai;

const MOTORCYCLE_NOT_FOUND = 'Motorcycle not found';
const mockMotorcycles: IMotorcycle[] = [
  {
    id: '60c42af7a3b83152bc05d6f3',
    engineCapacity: 1500,
    category: 'Street',
    buyValue: 60000,
    color: 'Silver',
    model: 'Road King',
    year: 2022,
    status: true,
  },
  {
    id: '60c42af7a3b83152bc05d6f4',
    engineCapacity: 750,
    category: 'Trail',
    buyValue: 40000,
    color: 'Yellow',
    model: 'GSX-R',
    year: 2020,
    status: true,
  },
  {
    id: '60c42af7a3b83152bc05d6f5',
    engineCapacity: 600,
    category: 'Custom',
    buyValue: 15000,
    color: 'Green',
    model: 'Africa Twin',
    year: 2017,
    status: false,
  },
];

describe('MotorcyclesServices', function () {
  describe('getAll', function () {
    it('should return all motorcycles', async function () {
      const getAllAllStub = sinon.stub(MotorcycleShopODM.prototype, 'getAll');
      getAllAllStub.resolves(mockMotorcycles);
      const motorcycleService = new MotorcyclesServices();
      const result = await motorcycleService.getAll();

      expect(result).to.eql(mockMotorcycles);
      getAllAllStub.restore();
    });
  });

  describe('getById', function () {
    it('should return a motorcycle by id', async function () {
      const getByIdStub = sinon.stub(MotorcycleShopODM.prototype, 'getById');
      getByIdStub.resolves(mockMotorcycles[0]);
      const result = await new MotorcyclesServices().getById('1');
      expect(result).to.deep.equal(mockMotorcycles[0]);
      getByIdStub.restore();
    });

    it('should throw a CustomError when motorcycle is not found(1)', async function () {
      const getByIdStub = sinon
        .stub(MotorcycleShopODM.prototype, 'getById')
        .returns(Promise.resolve(null));
      await expect(new MotorcyclesServices().getById('1')).to.be.rejectedWith(
        CustomError,
      );
      const motorcycleService = new MotorcyclesServices();

      try {
        await motorcycleService.getById('12345');
      } catch (error) {
        const customError = error as CustomError;
        expect(customError.status).to.equal(statusCodes.NOT_FOUND);
        expect(customError.message).to.equal(MOTORCYCLE_NOT_FOUND);
      }

      getByIdStub.restore();
    });
  });

  describe('create', function () {
    it('should create a new motorcycle', async function () {
      const motorcycle: IMotorcycle = {
        id: '60c42af7a3b83152bc05d6f5',
        engineCapacity: 1500,
        category: 'Street',
        buyValue: 9999,
        color: 'Red',
        model: 'Honda',
        year: 2000,
        status: true,
      };
      const createStub = sinon
        .stub(MotorcycleShopODM.prototype, 'create')
        .resolves(motorcycle);
      const result = await new MotorcyclesServices().create(motorcycle);
      expect(result).to.deep.equal(motorcycle);
      createStub.restore();
    });
  });

  describe('updateById', function () {
    it('should update a motorcycle by id', async function () {
      const updateByIdStub = sinon
        .stub(MotorcycleShopODM.prototype, 'updateById')
        .resolves(mockMotorcycles[0]);
      const updatedMotorcycle: IMotorcycle = {
        engineCapacity: 1000,
        category: 'Street',
        buyValue: 45000,
        color: 'Red',
        model: 'SuperStreet',
        year: 2022,
        status: true,
      };

      const result = await new MotorcyclesServices().updateById(
        '1',
        updatedMotorcycle,
      );

      expect(result).to.deep.equal(mockMotorcycles[0]);

      updateByIdStub.restore();
    });

    it('should throw a CustomError when motorcycle is not found(2)', async function () {
      const getByIdStub = sinon
        .stub(MotorcycleShopODM.prototype, 'getById')
        .returns(Promise.resolve(null));
      await expect(new MotorcyclesServices().getById('1')).to.be.rejectedWith(
        CustomError,
      );
      const updatedMotorcycle: IMotorcycle = {
        engineCapacity: 1000,
        category: 'Street',
        buyValue: 45000,
        color: 'Red',
        model: 'SuperStreet',
        year: 2022,
        status: true,
      };

      const motorcycleService = new MotorcyclesServices();
      const INVALID_MONGO_ID = 'Invalid mongo id';

      try {
        await motorcycleService.updateById('999', updatedMotorcycle);
      } catch (error) {
        const customError = error as CustomError;
        expect(customError.status).to.equal(statusCodes.UNPROCESSABLE_ENTITY);
        expect(customError.message).to.equal(INVALID_MONGO_ID);
      }

      getByIdStub.restore();
    });
  });

  describe('removeById', function () {
    let removeByIdStub: sinon.SinonStub<[id: string], Promise<IMotorcycle | null>>;
    let motorcyclesServices: MotorcyclesServices;
  
    beforeEach(function () {
      removeByIdStub = sinon.stub(MotorcycleShopODM.prototype, 'removeById');
      motorcyclesServices = new MotorcyclesServices();
    });
  
    afterEach(function () {
      removeByIdStub.restore();
    });
  
    it('should remove a motorcycle by id', async function () {
      await motorcyclesServices.removeById('1');
      sinon.assert.calledWith(removeByIdStub, '1');
    });
  
    it('should throw a CustomError when motorcycle is not found', async function () {
      removeByIdStub.throws(new CustomError(statusCodes.NOT_FOUND, MOTORCYCLE_NOT_FOUND));
  
      await expect(motorcyclesServices.removeById('1'))
        .to.be.rejectedWith(CustomError, MOTORCYCLE_NOT_FOUND);
      sinon.assert.calledWith(removeByIdStub, '1');
    });
  });
});
