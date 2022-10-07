<template>
  <div class="q-pa-md create-device-form">
    <h4>Create new device</h4>
    <q-form class="q-gutter-md" @submit="submit">
      <q-input v-model="name" label="Device name" filled></q-input>
      <q-select
        v-model="type"
        label="Device type"
        :options="types"
        filled
      ></q-select>
      <q-btn type="submit" color="green">Create device</q-btn>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeviceTypeManager } from '@iot/custom-device-manager';
import api from '@iot/services/http';
import { ICreateDevicePost } from '@iot/device';
import { useRouter } from 'vue-router';

const types = DeviceTypeManager.instance.getTypesList();

const router = useRouter();

const name = ref('');
const type = ref('');

async function submit() {
  const data: ICreateDevicePost = {
    name: name.value,
    type: type.value,
  };
  const req = await api.put('device/create', data);
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
