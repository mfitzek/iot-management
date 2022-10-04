import { defineAsyncComponent } from 'vue';

export default class BasicDevice {
  public readonly type = 'basic-device';
  public component = defineAsyncComponent(() => import('./ui/BasicDevice.vue'));
}
