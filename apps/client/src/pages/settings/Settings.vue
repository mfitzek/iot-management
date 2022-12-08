<template>
  <section>
    <p class="text-h5">Database</p>

    <q-input class="settingsInput" v-model="dbSizeMb" type="number" label="Max size (MB)" filled />
  </section>
  <section class="q-mt-md q-gutter-md">
    <p class="text-h5">Telemetry cache</p>

    <q-input
      v-model="cacheRecordsLimit"
      class="settingsInput"
      type="number"
      label="Max number of records before saving to DB"
      filled
    />
    <q-input
      v-model="cacheTimeoutSec"
      class="settingsInput"
      type="number"
      filled
      label="Time (seconds) after which the records are stored in the database"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dbSizeMb = ref(4096);

const cacheRecordsLimit = ref(100);
const cacheTimeoutSec = ref(300);
</script>

<style scoped>
.settingsInput {
  max-width: 600px;
}
</style>
