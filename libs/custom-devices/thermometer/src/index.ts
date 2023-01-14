import { CustomDevice } from '@iot/custom-device';
import { IDeviceData, IProvidedServices, IDevice } from '@iot/device';
import { Component, ComputedOptions, defineAsyncComponent, MethodOptions } from 'vue';

export class Thermometer implements CustomDevice {
  getType(): string {
    return 'Thermometer';
  }
  getMainComponent(): Component {
    return defineAsyncComponent(() => import('./client/thermometer.vue'));
  }

  getDevice(data: IDeviceData, providers: IProvidedServices): IDevice {
    throw new Error('Method not implemented.');
  }
}
