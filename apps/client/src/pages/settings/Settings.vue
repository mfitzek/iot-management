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

  <section class="q-mt-md q-gutter-md">
    <p class="text-h5">Mail settings</p>
    <p class="text">
      <a href="https://support.google.com/accounts/answer/185833?hl=en" target="_blank"
        >Generate and use Gmail app password</a
      >
    </p>
    <q-input v-model="mail" class="settingsInput" type="email" label="Gmail address" filled />
    <q-input
      v-model="mailPassword"
      class="settingsInput"
      type="password"
      filled
      label="Gmail app password"
    />
  </section>

  <q-btn
    class="fixed-bottom-right q-ma-md"
    color="primary"
    icon="edit"
    label="Save settings"
    @click="saveSettings()"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@iot/services/http-axios';
import { Settings } from '@iot/configuration';

const dbSizeMb = ref(0);

const cacheRecordsLimit = ref(0);
const cacheTimeoutSec = ref(0);

const mail = ref('');
const mailPassword = ref('');

async function fetchSettings() {
  const res = await axios.get<Settings>('settings');
  const data = res.data;

  dbSizeMb.value = data.database.maxDatabaseSizeMB;
  cacheRecordsLimit.value = data.telemetryCache.maxNumberOfRecords;
  cacheTimeoutSec.value = data.telemetryCache.cacheTimeoutMs / 1000;
  mail.value = data.mailSettings?.gmail ?? '';
  mailPassword.value = data.mailSettings?.password ?? '';
}

async function saveSettings() {
  const settings: Settings = {
    database: {
      maxDatabaseSizeMB: Number(dbSizeMb.value),
    },
    telemetryCache: {
      maxNumberOfRecords: Number(cacheRecordsLimit.value),
      cacheTimeoutMs: Number(cacheTimeoutSec.value * 1000),
    },
    mailSettings: {
      gmail: mail.value,
      password: mailPassword.value,
    },
  };

  await axios.post('settings', settings);
}

fetchSettings();
</script>

<style scoped>
.settingsInput {
  max-width: 600px;
}
</style>
