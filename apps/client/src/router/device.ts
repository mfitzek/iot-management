import { RouteRecordRaw } from 'vue-router';
import DeviceList from "@pages/device/DeviceList.vue";

const authRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'DeviceList',
    component: DeviceList,
  },

];

export default authRoutes;
