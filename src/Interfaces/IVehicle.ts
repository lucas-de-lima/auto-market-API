export default interface IVehicle {
  id?: string | undefined;
  model: string;
  status?: boolean | false;
  color: string;
  year: number;
  buyValue: number;
}