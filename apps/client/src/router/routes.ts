import { RouteRecordRaw } from 'vue-router';

import MainLayout from '@layouts/MainLayout.vue';
import Home from '@pages/Home.vue';
import NotFound from '@pages/errors/404.vue';
import authRoutes from './auth';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    name: 'MainLayout',
    children: [
      { path: '', name: 'Index page', component: Home },
      { path: '/auth', children: authRoutes },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
  },
];

export default routes;
