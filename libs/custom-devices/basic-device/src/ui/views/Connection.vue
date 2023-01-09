<template>
  <q-tabs v-model="current_tab" class="text-teal" dense>
    <q-tab name="http" label="HTTP" />
    <q-tab name="mqtt" label="MQTT" />
  </q-tabs>

  <component :is="current_view"></component>
</template>

<script setup lang="ts">
import http_view from '../components/connections/HTTP.vue';
import mqtt_view from '../components/connections/MQTT.vue';

import { computed, ref } from 'vue';

const current_tab = ref<'http' | 'mqtt'>('http');
const current_view = computed(() => {
  const views = {
    http: http_view,
    mqtt: mqtt_view,
  };
  return views[current_tab.value];
});
</script>

<style scoped></style>
