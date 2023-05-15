// ./statusCodes.ts
interface IStatusCodes {
  OK: number;
  NOT_FOUND: number;
  CREATED: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  UNPROCESSABLE_ENTITY: number;
  NO_CONTENT: number;
}

const statusCodes: IStatusCodes = {
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  NO_CONTENT: 204,
};

export default statusCodes;