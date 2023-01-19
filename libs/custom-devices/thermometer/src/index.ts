import { CustomDevice } from '@iot/custom-device';
import { DeviceData, IDevice, IProvidedServices } from '@iot/device';
import { Component, defineAsyncComponent } from 'vue';

export class Thermometer implements CustomDevice {
  getType(): string {
    return 'Thermometer';
  }
  getMainComponent(): Component {
    return defineAsyncComponent(() => import('./client/thermometer.vue'));
  }

  async getDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice> {
    const deviceModule = await import('./server/thermometer-device-api');
    return new deviceModule.ThermometerDevice(data, providers);
  }
}
