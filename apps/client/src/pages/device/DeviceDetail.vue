<template>
  <comp :id="id" />
</template>

<script setup lang="ts">
import api from '@iot/services/http';
import { DeviceTypeManager } from '@iot/custom-device-manager';
import { ICustomDevice } from '@iot/custom-device';

const props = defineProps({
  id: { type: String, required: true },
});

async function getDevice(id: string) {
  const req = await api.get<ICustomDevice>(`device/${id}`);
  return req.data;
}

const device = await getDevice(props.id ?? '...');
const comp = await DeviceTypeManager.instance.getDevice(device?.type ?? '')
  .component;
</script>

<style scoped></style>
