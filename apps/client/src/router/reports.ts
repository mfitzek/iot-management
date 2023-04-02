import { RouteRecordRaw } from 'vue-router';
import Reports from '../pages/reports/Reports.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Reports',
    component: Reports,
    children: [
      {
        path: ':id/settings',
        name: 'ReportSettings',
        component: () => import('../pages/reports/ReportsSettings.vue'),
        props: true,
      },
      {
        path: ':id/preview',
        name: 'ReportPreview',
        component: () => import('../pages/reports/ReportData.vue'),
        props: true,
      },
    ],
  },
];

export default routes;
