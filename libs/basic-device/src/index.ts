import { ICustomDevice } from '@iot/custom-device';
import { defineAsyncComponent } from 'vue';

export const BasicDevice: ICustomDevice = {
  type: 'basic-device',
  component: defineAsyncComponent(() => import('./ui/BasicDevice.vue')),
};
