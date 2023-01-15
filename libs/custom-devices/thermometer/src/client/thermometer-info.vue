<template>
  <div class="text-h4">23 °C</div>
  <div>Humidity 60%</div>
  <div>
    <span> Location: </span>
    <span> Home / Living room </span>
    <q-btn color="primary" icon="edit" flat rounded @click="startEditLocation" />
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

const store = useThermometerStore();

const editLocation = ref(false);
const editNameText = ref(store.name);

function startEditLocation() {
  editLocation.value = true;
}
</script>

<style scoped></style>
