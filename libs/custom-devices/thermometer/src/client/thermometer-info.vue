<template>
  <div class="text-h4">{{ store.temperature }} °C</div>
  <div>Humidity {{ store.humidity }}%</div>
  <div>
    <span> Location: </span>
    <span> Home / Living room </span>
    <q-btn color="primary" icon="edit" flat rounded @click="startEditLocation" />
  </div>
  <div class="row justify-end">
    <remove-device-button />
  </div>

  <q-dialog v-model="editLocation">
    <q-card>
      <q-card-section class="row items-center">
        <q-input v-model="editNameText" type="text" label="Location" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Update" color="primary" v-close-popup />
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThermometerStore } from './store';
import removeDeviceButton from './components/remove-device-button.vue';

const store = useThermometerStore();

const editLocation = ref(false);
const editNameText = ref(store.name);
setInterval(() => {
  store.fetchTelemetry();
}, 60 * 1000);

function startEditLocation() {
  editLocation.value = true;
}
</script>

<style scoped></style>
