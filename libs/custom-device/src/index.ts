import { defineAsyncComponent } from 'vue';

export { ICustomDevice } from './lib/interfaces/CustomDevice';

export default {
  hello: defineAsyncComponent(() => import('./lib/HelloWorld.vue')),
  sample: defineAsyncComponent(() => import('./lib/Sample.vue')),
};
