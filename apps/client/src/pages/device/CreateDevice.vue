<template>
  <div class="q-pa-md create-device-form">
    <h4>Create new device</h4>
    <q-form class="q-gutter-md" @submit="submit">
      <q-input v-model="name" label="Device name" filled></q-input>
      <q-select v-model="type" label="Device type" :options="types" filled></q-select>
      <q-btn type="submit" color="green">Create device</q-btn>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { CreateDevice } from '@iot/device';
import axios from '@iot/services/http-axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getDeviceTypes } from '../../custom-devices/supported-device-components';

const types = getDeviceTypes();

const router = useRouter();

const name = ref('');
const type = ref('');

async function submit() {
  const data: CreateDevice = {
    name: name.value,
    type: type.value,
  };
  const req = await axios.put('devices/', data);
  if (req.data.id) {
    router.push({ name: 'DeviceDetail', params: { id: req.data.id } });
  } else {
    console.error('Create device failed');
  }
}
</script>

<style scoped scss>
.create-device-form {
  max-width: 600px;
  margin: auto;
}
</style>
