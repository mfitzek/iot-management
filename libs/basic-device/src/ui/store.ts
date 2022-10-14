import { IDevice } from '@iot/device';
import { reactive, ref } from 'vue';
import http_api from '@iot/services/http';

interface IDeviceStore {
  device: IDevice | null;
}

const store = reactive<IDeviceStore>({
  device: null,
});

export async function fetchDevice(id: string) {
  const req = await http_api.get<IDevice | null>(`/device/${id}`);
  store.device = req.data;
}

export default store;
