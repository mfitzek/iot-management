import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import 'vue-router';

import authStore from '../store/auth';

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    isAdmin?: boolean;
    // must be declared by every route
    requiresAuth?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve({ el: to.hash });
        }, 500);
      });
    }
    if (savedPosition) {
      return savedPosition;
    }
    if (to.meta.noScroll && from.meta.noScroll) {
      return {};
    }
    return { top: 0 };
  },
  routes: routes,
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    if (authStore.is_authenticated() === false) {
      return { name: 'Login' };
    }
  }
});

export default router;
