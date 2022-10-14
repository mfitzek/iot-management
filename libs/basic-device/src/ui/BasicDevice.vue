<template>
  <div>
    <q-card class="q-ma-lg">
      <q-card-section>
        <h3>{{ store.device?.name }}</h3>
      </q-card-section>
      <q-card-section>
        <DeviceInformation></DeviceInformation>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { fetchDevice } from './store';
import DeviceInformation from './components/DeviceInformation.vue';
import store from './store';

const props = defineProps({
  id: { type: String, required: true },
});

// init store
await fetchDevice(props.id);
</script>

<style scoped></style>
