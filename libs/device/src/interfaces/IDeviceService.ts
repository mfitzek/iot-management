import { DeviceData } from '../api-interface';
import { CreateUserDevice, UpdateDevice } from './DeviceApi';

export interface IDeviceService {
  getDeviceList(): Promise<DeviceData[]>;
  getDevice(id: string): Promise<DeviceData | null>;
  createDevice(data: CreateUserDevice): Promise<DeviceData | null>;
  updateDevice(id: string, data: UpdateDevice): Promise<DeviceData | null>;
  removeDevice(id: string): Promise<boolean>;
}
