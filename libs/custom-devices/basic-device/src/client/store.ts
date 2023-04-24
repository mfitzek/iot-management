import { getDeviceMqttSettings, getHttpSettings, HttpSettings, IMqttSettings } from '../common';
import { DeviceData, UpdateDevice, KeyValue } from '@iot/device';
import axios from '@iot/services/http-axios';
import { reactive } from 'vue';

interface IDeviceStore {
  device: DeviceData | null;
}

const store = reactive<IDeviceStore>({
  device: null,
});

export async function fetchDevice(id: string) {
  const req = await axios.get<DeviceData | null>(`devices/${id}`);
  store.device = req.data;
}

export async function updateCurrentDevice() {
  if (!store.device) return;
  const id = store.device.id;

  const update: UpdateDevice = {
    id: id,
    name: store.device.name,
  };

  const req = await axios.post<DeviceData | null>(`/devices/${id}`, update);
  store.device = req.data;
}

export async function removeCurrentDevice() {
  if (!store.device) return;
  const id = store.device.id;

  const req = await axios.delete<boolean>(`/devices/${id}`);
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

export async function updateKeyValues(keyValues: KeyValue[]) {
  if (!store.device) return;
  const { id, name } = store.device;

  const update: UpdateDevice = {
    id: id,
    name: name,
    keyValues: keyValues,
  };

  const res = await axios.post<DeviceData | null>(`/devices/${id}`, update);
  store.device = res.data;
}

export default store;
