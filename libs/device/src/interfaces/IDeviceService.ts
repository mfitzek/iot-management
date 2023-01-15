import { DeviceData } from '../api-interface';

export interface CreateUserDevice {
  name: string;
  type: string;
  owner_id: string;
}

export interface IDeviceService {
  getDeviceList(): Promise<DeviceData[]>;
  getDevice(id: string): Promise<DeviceData | null>;
  createDevice(data: CreateUserDevice): Promise<DeviceData | null>;
  updateDevice(id: string, data: DeviceData): Promise<DeviceData | null>;
  removeDevice(id: string): Promise<boolean>;
}
