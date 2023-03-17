import { CustomDeviceFactory } from '@iot/custom-device';
import { DeviceData, IProvidedServices, IDevice } from '@iot/device';
import { ThermometerDevice } from './thermometer-device-api';

export class ThermometerDeviceFactory implements CustomDeviceFactory {
  async createDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice> {
    return new ThermometerDevice(data, providers);
  }
}
