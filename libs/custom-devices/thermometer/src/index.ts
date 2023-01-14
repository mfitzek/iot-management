import { CustomDevice } from '@iot/custom-device';
import { Device, IDevice, IDeviceData, IProvidedServices } from '@iot/device';
import { Component, defineAsyncComponent } from 'vue';

export class Thermometer implements CustomDevice {
  getType(): string {
    return 'Thermometer';
  }
  getMainComponent(): Component {
    return defineAsyncComponent(() => import('./client/thermometer.vue'));
  }

  getDevice(data: IDeviceData, providers: IProvidedServices): IDevice {
    const device = new Device(data, providers);
    return device;
  }
}
