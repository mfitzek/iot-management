import { RouteRecordRaw } from 'vue-router';
import SettingsMainVue from '../pages/settings/SettingsMain.vue';

const routes: RouteRecordRaw[] = [
  { path: '', component: SettingsMainVue, name: 'SettingsMain' },
];

export default routes;
