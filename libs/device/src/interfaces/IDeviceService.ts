import { IDevice } from './IDevice';

export interface IDeviceService {
  getDeviceList(): Promise<IDevice[]>;
  getDevice(id: string): Promise<IDevice | null>;
  createDevice(data: IDevice): Promise<IDevice | null>;
  updateDevice(id: string, data: IDevice): Promise<IDevice | null>;
  removeDevice(id: string): Promise<boolean>;
}
