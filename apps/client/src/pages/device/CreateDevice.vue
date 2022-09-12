<template>
  <div class="q-pa-md create-device-form">
    <h4>Create new device</h4>
    <q-form class="q-gutter-md">
      <q-input v-model="name" label="Device name" filled></q-input>
      <q-select
        v-model="type"
        label="Device type"
        :options="types"
        filled
      ></q-select>
      <q-btn type="submit" color="green">Create device</q-btn>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const types = ['X752', 'ZY-320', 'Thermometer'];

const name = ref('');
const type = ref('');
</script>

<style scoped scss>
.create-device-form {
  max-width: 600px;
  margin: auto;
}
</style>
