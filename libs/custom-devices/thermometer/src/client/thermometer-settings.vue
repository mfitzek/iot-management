<template>
  <div>
    <h5>MQTT connection</h5>
    <q-input v-model="connectionString" type="text" label="MQTT connection string" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useThermometerStore } from './store';

const store = useThermometerStore();

const connectionString = ref('');
</script>

<style scoped></style>
