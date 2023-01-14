<template>
  <comp :id="id" />
</template>

<script setup lang="ts">
import api from '@iot/services/http';
import { DeviceTypeManager } from '@iot/custom-device-manager';
import { IDeviceData } from '@iot/device';

const props = defineProps({
  id: { type: String, required: true },
});

async function getDevice(id: string) {
  const req = await api.get<IDeviceData>(`device/${id}`);
  return req.data;
}

const device = await getDevice(props.id ?? '...');
const comp = await DeviceTypeManager.instance.getDevice(device?.type ?? '').getMainComponent();
</script>

<style scoped></style>
