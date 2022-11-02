import { IDeviceData } from './IDevice';

export interface IDeviceService {
  getDeviceList(): Promise<IDeviceData[]>;
  getDevice(id: string): Promise<IDeviceData | null>;
  createDevice(data: IDeviceData): Promise<IDeviceData | null>;
  updateDevice(id: string, data: IDeviceData): Promise<IDeviceData | null>;
  removeDevice(id: string): Promise<boolean>;
}
