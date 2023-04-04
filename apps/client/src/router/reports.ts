import { RouteRecordRaw } from 'vue-router';
import Reports from '../pages/reports/Reports.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Reports',
    component: Reports,
    children: [
      {
        path: ':id',
        name: 'Report',
        component: () => import('../pages/reports/Report.vue'),
        props: true,
        children: [
          {
            path: 'settings',
            name: 'ReportSettings',
            component: () => import('../pages/reports/ReportsSettings.vue'),
          },
          {
            path: 'preview',
            name: 'ReportPreview',
            component: () => import('../pages/reports/ReportData.vue'),
            props: true,
          },
        ],
      },
      {
        path: 'create',
        name: 'CreateReport',
        component: () => import('../pages/reports/CreateReport.vue'),
      },
    ],
  },
];

export default routes;
