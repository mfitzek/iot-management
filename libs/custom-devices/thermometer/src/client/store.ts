import { MQTT_KEY } from '@iot/custom-devices/thermometer/common';
import { DeviceData, IAttribute } from '@iot/device';
import { axios } from '@iot/services/http-axios';
import { ITelemetryResponse } from '@iot/telemetry';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useThermometerStore = defineStore('thermometer', () => {
  const device = ref<DeviceData | null>(null);
  const temperature = ref('NA');
  const humidity = ref('NA');

  let tempId: string | undefined;
  let humiId: string | undefined;

  const name = computed(() => device.value?.name ?? 'Not available');
  const mqtt = computed(
    () => device.value?.keyValues.find((kv) => kv.key === MQTT_KEY)?.value ?? ''
  );

  async function fetchData(id: string) {
    const res = await axios.get<DeviceData>(`device/${id}`);
    device.value = res.data;

    tempId = res.data.attributes.find((a: IAttribute) => a.name === 'temperature')?.id;
    humiId = res.data.attributes.find((a: IAttribute) => a.name === 'humidity')?.id;
    fetchTelemetry();
  }

  async function fetchTelemetry() {
    const telRes = await axios.get<ITelemetryResponse>('telemetry', {
      params: {
        attr: [tempId, humiId],
      },
    });
    if (telRes.data.result.length > 0) {
      const dev = telRes.data.result[0];
      const tempData = dev.attributes[0].telemetry;
      const humiData = dev.attributes[1].telemetry;

      temperature.value = tempData.pop()?.value ?? 'NA';
      humidity.value = humiData.pop()?.value ?? 'NA';
    }
  }

  async function removeDevice() {
    if (device.value == null) return false;

    const id = device.value.id;

    const req = await axios.delete<boolean>(`/device/${id}`);
    if (req.data) {
      device.value = null;
    }

    return req.data;
  }

  return {
    device,
    fetchData,
    name,
    mqtt,
    removeDevice,
    temperature,
    humidity,
    fetchTelemetry,
  };
});
