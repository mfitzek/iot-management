import { ICustomDevice } from '@iot/custom-device';
import { Device, IDevice, IDeviceData } from '@iot/device';
import { IProvidedServices } from '@iot/custom-device';
import { defineAsyncComponent } from 'vue';

export class BasicDevice implements ICustomDevice {
  factory(data: IDeviceData, providers: IProvidedServices): IDevice {
    return new Device(providers.device_service, data);
  }

  type = 'basic-device';
  component = defineAsyncComponent(() => import('./ui/BasicDevice.vue'));
}

export default new BasicDevice();
