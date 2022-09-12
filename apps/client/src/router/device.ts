import { RouteRecordRaw } from 'vue-router';
import DeviceList from "@pages/device/DeviceList.vue";
import DeviceLayout from "@layouts/DeviceLayout.vue";

const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'DeviceList',
    component: DeviceList,
  },
  {
    path: ':id',
    name: 'DeviceDetail',
    component: DeviceLayout,
    props: true
  }
];

export default authRoutes;
