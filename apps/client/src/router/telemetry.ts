import { RouteRecordRaw } from 'vue-router';

import TelemetryVue from '../pages/telemetry/Telemetry.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Telemetry',
    component: TelemetryVue,
  },
];

export default routes;
