import { RouteRecordRaw } from 'vue-router';

import MainLayout from '@layouts/MainLayout.vue';
import Home from '@pages/Home.vue';
import NotFound from '@pages/errors/404.vue';
import authRoutes from './auth';
import deviceRoutes from './device';
import telemetryRoutes from './telemetry';
import settingsRoutes from './settings';
import DashboardVue from '../pages/device/Dashboard.vue';
import reportsRoutes from './reports';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    name: 'MainLayout',
    children: [
      { path: '', name: 'Index page', component: Home },
      { path: '/auth', children: authRoutes },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardVue,
        meta: { requiresAuth: true },
      },
      { path: '/device', children: deviceRoutes, meta: { requiresAuth: true } },
      {
        path: '/telemetry',
        children: telemetryRoutes,
        meta: { requiresAuth: true },
      },
      {
        path: '/settings',
        children: settingsRoutes,
        meta: { requiresAuth: true, isAdmin: true },
      },
      { path: '/reports', children: reportsRoutes, meta: { requiresAuth: true } },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
  },
];

export default routes;
