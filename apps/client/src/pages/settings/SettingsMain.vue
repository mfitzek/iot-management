<template>
  <div>
    <q-toolbar class="bg-light-blue text-white">
      <q-tabs class="" dense>
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

<script setup lang="ts"></script>

<style scoped></style>
