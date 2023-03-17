import { defineAsyncComponent } from 'vue';

const BasicDeviceComponent = defineAsyncComponent(() => import('./client/basic-device.vue'));

export { BasicDeviceComponent };
