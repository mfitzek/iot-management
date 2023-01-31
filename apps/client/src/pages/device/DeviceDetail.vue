<template>
  <comp :id="id" />
</template>

<script setup lang="ts">
import api from '@iot/services/http';
import { DeviceData } from '@iot/device';
import { getDeviceComponent } from '../../custom-devices/supportedCustomDevices';

const props = defineProps({
  id: { type: String, required: true },
});

async function getDevice(id: string) {
  const req = await api.get<DeviceData>(`device/${id}`);
  return req.data;
}

const device = await getDevice(props.id ?? '...');
const comp = getDeviceComponent(device.type);
console.log(comp);
</script>

<style scoped></style>
