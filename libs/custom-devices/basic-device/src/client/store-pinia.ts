import { DeviceData } from '@iot/device';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@iot/services/http-axios';
import { BasicDeviceData } from '../common';

export const useBasicDeviceStore = defineStore('basic-device', () => {
  const device = ref<BasicDeviceData | null>(null);
  const isLoading = ref(false);

  async function fetchDevice(id: string) {
    isLoading.value = true;
    const req = await axios.get<BasicDeviceData | null>(`devices/${id}`);
    device.value = req.data;
    isLoading.value = false;
  }

  return {
    device,
  };
});
