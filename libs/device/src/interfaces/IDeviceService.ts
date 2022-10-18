import { IDevice } from './IDevice';

export interface IDeviceService {
  GetDevice(id: string): Promise<IDevice>;
  UpdateDevice(id: string, data: IDevice): Promise<boolean>;
  RemoveDevice(id: string): Promise<boolean>;
}
