import { DeviceData } from '@iot/device';

export interface BasicDeviceData extends DeviceData {
  status: string;
  location: string;
}
