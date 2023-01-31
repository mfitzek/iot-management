<template>
  <div class="q-px-md">
    <q-card class="q-ma-lg device-card q-mx-auto">
      <q-card-section horizontal>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h5">{{ store.name }}</q-item-label>
            <q-item-label caption> Thermometer </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <q-tabs dense v-model="currentTab">
            <q-tab name="info" icon="info" label="Information" />
            <q-tab name="connection" icon="s_settings_input_antenna" label="Configuration" />
          </q-tabs>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <thermometer-info v-if="currentTab == 'info'"> </thermometer-info>
        <thermometer-settings v-if="currentTab == 'connection'"></thermometer-settings>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import thermometerInfo from './thermometer-info.vue';
import thermometerSettings from './thermometer-settings.vue';
import { useThermometerStore } from './store';
import { ref } from 'vue';
const props = defineProps({
  id: { type: String, required: true },
});
const currentTab = ref('info');

const store = useThermometerStore();
store.fetchData(props.id);
</script>

<style scoped>
.device-card {
  max-width: 1200px;
}
</style>
