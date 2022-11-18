import { ICustomDevice } from '@iot/custom-device';
import { IDevice, IDeviceData } from '@iot/device';
import { IProvidedServices } from '@iot/custom-device';
import { defineAsyncComponent } from 'vue';
import { APIBasicDevice } from './api/basicDevice';

export class BasicDevice implements ICustomDevice {
  factory(data: IDeviceData, providers: IProvidedServices): IDevice {
    const device = new APIBasicDevice(data, providers);
    return device;
  }

  type = 'basic-device';
  component = defineAsyncComponent(() => import('./ui/BasicDevice.vue'));
}

export default new BasicDevice();
