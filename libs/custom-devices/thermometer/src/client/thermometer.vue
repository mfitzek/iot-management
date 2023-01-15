<template>
  <div>
    <q-card class="q-ma-lg device-card q-mx-auto">
      <q-card-section horizontal>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h5">{{ store.name }}</q-item-label>
            <q-item-label caption> Thermometer </q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
          <q-tabs dense>
            <q-tab name="info" icon="info" label="Information" />
            <q-tab name="connection" icon="s_settings_input_antenna" label="Connection" />
          </q-tabs>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <thermometer-info> </thermometer-info>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import thermometerInfo from './thermometer-info.vue';
import { useThermometerStore } from './store';
const props = defineProps({
  id: { type: String, required: true },
});

const store = useThermometerStore();
store.fetchData(props.id);
</script>

<style scoped>
.device-card {
  max-width: 1200px;
}
</style>
