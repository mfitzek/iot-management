import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from '@iot/services/http-axios';
import { BasicDeviceData, HttpSettings, defaultHttpSettings, getHttpSettings } from '../common';
import { defaultMqttSettings, parseMqttSettings } from './mqtt-settings';
import { KeyValue, UpdateDevice } from '@iot/device';

export const useBasicDeviceStore = defineStore('basic-device', () => {
  const device = ref<BasicDeviceData | null>(null);
  const isLoading = ref(false);

  async function fetchDevice(id: string) {
    isLoading.value = true;
    const req = await axios.get<BasicDeviceData | null>(`devices/${id}`);
    device.value = req.data;
    isLoading.value = false;
  }

  async function updateCurrentDevice() {
    if (!device.value) return;
    const id = device.value.id;

    const update: UpdateDevice = {
      id: id,
      name: device.value.name,
    };

    const req = await axios.post<BasicDeviceData | null>(`/devices/${id}`, update);
    device.value = req.data;
  }

  async function removeCurrentDevice() {
    if (!device.value) return;
    const id = device.value.id;

    const req = await axios.delete<boolean>(`/devices/${id}`);
    if (req.data) {
      device.value = null;
    }

    return req.data;
  }

  async function updateKeyValues(keyValues: KeyValue[]) {
    if (!device.value) return;
    const { id, name } = device.value;

    const update: UpdateDevice = {
      id: id,
      name: name,
      keyValues: keyValues,
    };

    const res = await axios.post<BasicDeviceData | null>(`/devices/${id}`, update);
    device.value = res.data;
  }

  const httpGatewaySettings = computed(() => {
    if (!device.value) return defaultHttpSettings;
    return getHttpSettings(device.value);
  });

  const mqttSettings = computed(() => {
    if (!device.value) {
      return defaultMqttSettings;
    }
    return parseMqttSettings(device.value as any);
  });

  return {
    device,
    isLoading,
    fetchDevice,
    updateCurrentDevice,
    removeCurrentDevice,
    updateKeyValues,
    httpGatewaySettings,
    mqttSettings,
  };
});
