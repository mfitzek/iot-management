import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { DeviceData } from '@iot/device';
import http from '@iot/services/http';

export const useThermometerStore = defineStore('thermometer', () => {
  const device = ref<DeviceData | null>(null);

  const name = computed(() => device.value?.name ?? 'Not available');

  async function fetchData(id: string) {
    const res = await http.get<DeviceData>(`device/${id}`);
    device.value = res.data;
  }

  return {
    device,
    fetchData,
    name,
  };
});
