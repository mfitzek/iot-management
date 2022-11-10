import { RouteRecordRaw } from 'vue-router';

import MainLayout from '@layouts/MainLayout.vue';
import Home from '@pages/Home.vue';
import NotFound from '@pages/errors/404.vue';
import authRoutes from './auth';
import deviceRoutes from './device';
import telemetryRoutes from './telemetry';
import settingsRoutes from './settings';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    name: 'MainLayout',
    children: [
      { path: '', name: 'Index page', component: Home },
      { path: '/auth', children: authRoutes },
      { path: '/device', children: deviceRoutes, meta: { requiresAuth: true } },
      {
        path: '/telemtry',
        children: telemetryRoutes,
        meta: { requiresAuth: true },
      },
      {
        path: '/settings',
        children: settingsRoutes,
        meta: { requiresAuth: true },
      },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
  },
];

export default routes;
