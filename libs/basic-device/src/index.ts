import { defineAsyncComponent } from 'vue';

export class BasicDevice {
  public readonly type = 'basic-device';
  public component = defineAsyncComponent(() => import('./ui/BasicDevice.vue'));
}
