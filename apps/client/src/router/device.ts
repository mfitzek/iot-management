import { RouteRecordRaw } from 'vue-router';
import DeviceList from '@pages/device/DeviceList.vue';
import DeviceDetail from '@pages/device/DeviceDetail.vue';
import CreateDevice from '@pages/device/CreateDevice.vue';

const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'DeviceList',
    component: DeviceList,
  },
  {
    path: 'detail/:id',
    name: 'DeviceDetail',
    component: DeviceDetail,
    props: true,
  },
  {
    path: 'create',
    name: 'DeviceCreate',
    component: CreateDevice,
  },
];

export default authRoutes;
