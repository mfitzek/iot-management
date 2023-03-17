import { defineAsyncComponent } from 'vue';

export const ThermometerComponent = defineAsyncComponent(() => import('./client/thermometer.vue'));
