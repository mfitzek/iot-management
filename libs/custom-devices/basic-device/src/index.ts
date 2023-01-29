import { CustomDevice } from '@iot/custom-device';
import { DeviceData, IDevice, IProvidedServices } from '@iot/device';
import { Component, defineAsyncComponent } from 'vue';

export class BasicDevice implements CustomDevice {
  getType(): string {
    return 'basic-device';
  }
  getMainComponent(): Component {
    return defineAsyncComponent(() => import('./ui/BasicDevice.vue'));
  }
  async getDevice(data: DeviceData, providers: IProvidedServices): Promise<IDevice> {
    const deviceModule = await import('./api/BasicDevice');
    return new deviceModule.APIBasicDevice(data, providers);
  }
}
export default new BasicDevice();
