<template>
  <div>
    <q-toolbar class="bg-green text-white">
      <q-tabs class="text-teal" dense>
        <q-route-tab
          name="dasboard"
          icon="dashboard"
          label="Dashboard"
          :to="{ name: 'SettingsDashboard' }"
        />
        <q-route-tab
          name="settings"
          icon="settings"
          label="Settings"
          :to="{ name: 'SettingsSettings' }"
        />
        <q-route-tab
          name="accounts"
          icon="people"
          label="Accounts"
          :to="{ name: 'SettingsAccounts' }"
        />
      </q-tabs>
    </q-toolbar>

    <div class="q-pa-md"><RouterView></RouterView></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@iot/services/http';

const file = ref(null);

async function restore() {
  if (file.value) {
    let form = new FormData();
    form.append('backup', file.value);
    try {
      await api.post('/settings/restore', form);
      // this.$store.dispatch("user_settings/fetch");
      // this.$store.commit("app/Push", { message: "Databáze úspěšně obnovena", type: "success" });
    } catch (error) {
      // this.$store.commit("app/Push", {
      //     message: "Chyba při obnovování dat.",
      //     type: "error",
      // });
      console.log(error);
    }
  }
}
async function backup() {
  const res = await api.post('/settings/backup', null, {
    responseType: 'blob',
  });
  const filename = res.headers['content-disposition'].split('=')[1];
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped></style>
