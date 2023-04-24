<template>
  <comp :id="id" />
</template>

<script setup lang="ts">
import axios from '@iot/services/http-axios';
import { DeviceData } from '@iot/device';
import { getDeviceComponent } from '../../custom-devices/supported-device-components';

const props = defineProps({
  id: { type: String, required: true },
});

async function getDevice(id: string) {
  const req = await axios.get<DeviceData>(`devices/${id}`);
  return req.data;
}

const device = await getDevice(props.id ?? '...');
const comp = getDeviceComponent(device.type);
</script>

<style scoped></style>
