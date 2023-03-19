import { RouteRecordRaw } from 'vue-router';
import SettingsMainVue from '../pages/settings/SettingsMain.vue';
import DashboardVue from '../pages/settings/Dashboard.vue';
import UsersVue from '../pages/settings/Users.vue';
import SettingsVue from '../pages/settings/Settings.vue';
import LogsVue from '../pages/settings/Logs.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: SettingsMainVue,
    name: 'SettingsMain',
    children: [
      { path: 'dashboard', name: 'SettingsDashboard', component: DashboardVue },
      { path: 'settings', name: 'SettingsSettings', component: SettingsVue },
      { path: 'accounts', name: 'SettingsAccounts', component: UsersVue },
      { path: 'logs', name: 'SettingsLogs', component: LogsVue },
    ],
  },
];

export default routes;
