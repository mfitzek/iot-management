import { IDevice, DeviceData, IProvidedServices } from '@iot/device';

export interface CustomDeviceFactory {
  createDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice>;
}
