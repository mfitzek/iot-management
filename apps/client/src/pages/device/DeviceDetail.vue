<template>
  <suspense>
    <comp></comp>
    <template #fallback> idk </template>
  </suspense>
</template>

<script setup lang="ts">
import api from '@iot/services/http';
import { DeviceTypeManager } from '@iot/custom-device-manager';

const props = defineProps({
  id: String,
});

async function getDevice(id: string) {
  const req = await api.get(`device/${id}`);
  return req.data;
}

const device = await getDevice(props.id ?? '');

const comp = DeviceTypeManager.instance.getDevice(device.type).component;
console.log(device, comp);
</script>

<style scoped></style>
