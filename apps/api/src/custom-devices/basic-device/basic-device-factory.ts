import { CustomDeviceFactory } from '@iot/custom-device';
import { BasicDevice } from './basic-device';
import { DeviceData, IProvidedServices, IDevice } from '@iot/device';

export class BasicDeviceFactory implements CustomDeviceFactory {
  async createDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice> {
    return new BasicDevice(data, providers);
  }
}
