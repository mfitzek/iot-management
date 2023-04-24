<template>
  <section class="q-gutter-md">
    <div class="text-h5">MQTT</div>
    <div class="row">
      <q-input
        v-model="connectionString"
        type="text"
        label="MQTT connection string"
        filled
        class="col-12 col-md-8 col-lg-6"
      />
    </div>
    <div>
      <q-btn color="primary" label="Update Settings" @click="updateSettings" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useThermometerStore } from './store';
import axios from '@iot/services/http-axios';
import { UpdateDevice } from '@iot/device';
import { useQuasar } from 'quasar';
import { MQTT_KEY } from '@iot/custom-devices/thermometer/common';

const store = useThermometerStore();
const connectionString = ref(store.mqtt);
const { notify } = useQuasar();

async function updateSettings() {
  const mqtt = connectionString.value;

  if (!store.device) return;
  const { id, name } = store.device;
  const update: UpdateDevice = {
    id,
    name,
    keyValues: [{ key: MQTT_KEY, value: mqtt }],
  };
  try {
    await axios.post(`devices/${id}`, update);
    notify({ message: 'Connection string updated', icon: 'announcement', color: 'positive' });
  } catch (err) {
    console.log(err);
    notify({ message: 'Error has occured', icon: 'announcement', color: 'negative' });
  }

  await store.fetchData(id);
}
</script>

<style scoped></style>
