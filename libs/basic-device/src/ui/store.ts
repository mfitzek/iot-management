import { IDeviceData } from '@iot/device';
import { reactive, ref } from 'vue';
import http_api from '@iot/services/http';

interface IDeviceStore {
  device: IDeviceData | null;
}

const store = reactive<IDeviceStore>({
  device: null,
});

export async function fetchDevice(id: string) {
  const req = await http_api.get<IDeviceData | null>(`/device/${id}`);
  store.device = req.data;
}

export async function updateCurrentDevice() {
  const id = store.device!.id!;

  const req = await http_api.post<IDeviceData | null>(
    `/device/${id}`,
    store.device
  );
  store.device = req.data;
}

export default store;
