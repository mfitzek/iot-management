<template>
  <div class="q-gutter-md info_form">
    <q-input v-model="name" type="text" label="Device name" filled />
    <q-select v-model="type" :options="options" label="Device type" filled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeviceTypeManager } from '@iot/custom-device-manager';
import store from '../store';

const options = DeviceTypeManager.instance.getTypesList();
const name = ref(store.device?.name);
const type = ref(store.device?.type);
</script>

<style scoped lang="scss">

.info_form{
  max-width: 400px;
}
</style>
