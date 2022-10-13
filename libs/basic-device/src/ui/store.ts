import { IDevice } from '@iot/device';
import { ref } from 'vue';
import http_api from '@iot/services/http';

export const device = ref<IDevice | null>(null);

export async function fetchDevice(id: string) {
  const req = await http_api.get<IDevice | null>(`/api/device/${id}`);
  device.value = req.data;
  console.log(device.value);
}
