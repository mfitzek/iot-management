import { RouteRecordRaw } from 'vue-router';
import DeviceList from '@pages/device/DeviceList.vue';
import CreateDevice from '@pages/device/CreateDevice.vue';
import DeviceLayoutVue from '../layouts/DeviceLayout.vue';

const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'DeviceList',
    component: DeviceList,
  },
  {
    path: 'detail/:id',
    name: 'DeviceDetail',
    component: DeviceLayoutVue,
    props: true,
  },
  {
    path: 'create',
    name: 'DeviceCreate',
    component: CreateDevice,
  },
];

export default authRoutes;
