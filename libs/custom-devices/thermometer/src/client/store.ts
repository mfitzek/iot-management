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

  async function removeDevice() {
    if (device.value == null) return false;

    const id = device.value.id;

    const req = await http.delete<boolean>(`/device/${id}`);
    if (req.data) {
      device.value = null;
    }

    return req.data;
  }

  return {
    device,
    fetchData,
    name,
    removeDevice,
  };
});
