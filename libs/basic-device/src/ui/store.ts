import { IMqttSettings } from './../common/mqtt/IMqttSettings';
import { IDeviceData } from '@iot/device';
import { reactive, ref } from 'vue';
import http_api from '@iot/services/http';
import { getDeviceMqttSettings, setDeviceMqttsettings } from '../common/mqtt/mqtt';

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

export async function removeCurrentDevice() {
  const id = store.device!.id!;

  const req = await http_api.delete<boolean>(`/device/${id}`);
  if (req.data) {
    store.device = null;
  }

  return req.data;
}

export function getMqttSettings(): IMqttSettings{
  let settings: IMqttSettings = {
    active: false,
    url: "",
    client_id: "",
    username: "",
    password: "",
    attribute_mapping: []
  }

  if(store.device){
    const parsed = getDeviceMqttSettings(store.device);
    if(parsed){
      settings = parsed;
    }
  }
  
  return settings;
}

export function setMqttSettings(settings: IMqttSettings){
  if(store.device){
    setDeviceMqttsettings(store.device, settings);
  }
}

export default store;
