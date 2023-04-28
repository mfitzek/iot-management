import { CustomDeviceFactory } from '@iot/custom-device';
import { DeviceData, IProvidedServices, IDevice } from '@iot/device';
import { Termohlavice } from './termohlavice';

export class TermohlaviceFactory implements CustomDeviceFactory {
  public async createDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice> {
    return new Termohlavice(data, providers);
  }
}
