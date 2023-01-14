import { CustomDevice } from '@iot/custom-device';
import { IDevice, IDeviceData } from '@iot/device';
import { IProvidedServices } from '@iot/device';
import { Component, ComputedOptions, defineAsyncComponent, MethodOptions } from 'vue';
import { APIBasicDevice } from './api/BasicDevice';

export class BasicDevice implements CustomDevice {
  getType(): string {
    return 'basic-device';
  }
  getMainComponent(): Component {
    return defineAsyncComponent(() => import('./ui/BasicDevice.vue'));
  }
  getDevice(data: IDeviceData, providers: IProvidedServices): IDevice {
    const device = new APIBasicDevice(data, providers);
    return device;
  }
}
export * from './api/BasicDevice';
export default new BasicDevice();
