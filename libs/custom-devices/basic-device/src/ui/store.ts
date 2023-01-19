import { DeviceData, UpdateDevice, UpdateKeyValue } from '@iot/device';
import http_api from '@iot/services/http';
import { reactive } from 'vue';
import { getHttpSettings, HttpSettings } from '../common/http/HttpSettings';
import { getDeviceMqttSettings } from '../common/mqtt/mqtt';
import { IMqttSettings } from './../common/mqtt/IMqttSettings';

interface IDeviceStore {
  device: DeviceData | null;
}

const store = reactive<IDeviceStore>({
  device: null,
});

export async function fetchDevice(id: string) {
  const req = await http_api.get<DeviceData | null>(`/device/${id}`);
  store.device = req.data;
}

export async function updateCurrentDevice() {
  if (!store.device) return;
  const id = store.device.id;

  const update: UpdateDevice = {
    id: id,
    name: store.device.name,
  };

  const req = await http_api.post<DeviceData | null>(`/device/${id}`, update);
  store.device = req.data;
}

export async function removeCurrentDevice() {
  if (!store.device) return;
  const id = store.device.id;

  const req = await http_api.delete<boolean>(`/device/${id}`);
  if (req.data) {
    store.device = null;
  }

  return req.data;
}

export function getMqttSettings(): IMqttSettings {
  let settings: IMqttSettings = {
    active: false,
    url: '',
    username: '',
    password: '',
    attribute_mapping: [],
  };

  if (store.device) {
    const parsed = getDeviceMqttSettings(store.device);
    if (parsed) {
      settings = parsed;
    }
  }

  return settings;
}

export function getHttpGatewaySettings(): HttpSettings | undefined {
  if (!store.device) return undefined;
  return getHttpSettings(store.device);
}

export async function updateKeyValues(keyValues: UpdateKeyValue[]) {
  if (!store.device) return;
  const { id, name } = store.device;

  const update: UpdateDevice = {
    id: id,
    name: name,
    keyValues: keyValues,
  };

  const res = await http_api.post<DeviceData | null>(`/device/${id}`, update);
  store.device = res.data;
}

export default store;
