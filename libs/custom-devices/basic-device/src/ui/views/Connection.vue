<template>
  <div class="row q-gutter-md">
    <div class="col-lg-2 col-md-3 col-12">
      <q-list bordered>
        <q-item
          clickable
          v-ripple
          v-for="self of connections"
          :key="self.type"
          @click="current_tab = self.type"
          :active="isActive(self.type)"
          active-class="text-weight-bold"
        >
          <q-item-section>{{ self.type }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="col">
      <component :is="current_view"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import http_view from '../components/connections/HTTP.vue';
import mqtt_view from '../components/connections/MQTT.vue';

import { QItem, QItemSection, QList } from 'quasar';
import { computed, ref } from 'vue';

const connections = [
  { type: 'HTTP', icon: 'wifi' },
  { type: 'MQTT', icon: null },
];

const current_tab = ref('HTTP');
const current_view = computed(() => {
  const views: { [type: string]: unknown } = {
    HTTP: http_view,
    MQTT: mqtt_view,
  };
  const tab = current_tab.value;
  return views[tab];
});

function isActive(type: string) {
  return current_tab.value === type;
}
</script>

<style scoped></style>
