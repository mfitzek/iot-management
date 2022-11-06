import { ICustomDevice } from '@iot/custom-device';
import { Device, IDevice, IDeviceData, IDeviceService } from '@iot/device';
import { defineAsyncComponent } from 'vue';

export class BasicDevice implements ICustomDevice {

  factory(data: IDeviceData, device_service: IDeviceService): IDevice {
      return new Device(device_service, data);
  }

  type = 'basic-device';
  component = defineAsyncComponent(() => import('./ui/BasicDevice.vue'));

};

export default new BasicDevice();