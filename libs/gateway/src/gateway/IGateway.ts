import { IDevice } from '@iot/device';

export interface IGateway {
  registerDevice(device: IDevice): Promise<boolean>;
  unregisterDevice(device: IDevice): Promise<boolean>;
}
