import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@pages/auth/Login.vue';
import SignupPage from '@pages/auth/Signup.vue';

const authRoutes: RouteRecordRaw[] = [
  {
    path: 'login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: 'signup',
    name: 'SignUp',
    component: SignupPage,
  },
];

export default authRoutes;
