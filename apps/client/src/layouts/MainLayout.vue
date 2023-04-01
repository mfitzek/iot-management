<template>
  <q-layout view="lHh lpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> </q-toolbar-title>

        <UserInfo></UserInfo>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" showIfAbove side="left" bordered>
      <!-- drawer content -->

      <q-list>
        <q-item>
          <q-item-section class="text-h5">IoT Data Storage</q-item-section>
        </q-item>
        <q-separator />
        <q-item v-for="(link, index) in links_filtered" :key="index" :to="link.route" dense>
          <q-item-section>{{ link.name }}</q-item-section>
          <q-item-section avatar>
            <q-icon :name="link.icon"></q-icon>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import UserInfo from '@components/toolbar/UserInfo.vue';
import auth from '../store/auth';

const leftDrawerOpen = ref(false);
const links = [
  {
    name: 'Dashboard',
    icon: 'sym_o_dashboard',
    route: { name: 'Dashboard' },
    isAdmin: false,
  },
  {
    name: 'Device',
    icon: 'sym_o_table_lamp',
    route: { name: 'DeviceList' },
    isAdmin: false,
  },
  {
    name: 'Data',
    icon: 'sym_o_monitoring',
    route: { name: 'Telemetry' },
    isAdmin: false,
  },
  {
    name: 'Reports',
    icon: 'sym_o_feed',
    route: { name: 'Reports' },
    isAdmin: false,
  },
  {
    name: 'Administration',
    icon: 'sym_o_settings',
    route: { name: 'SettingsDashboard' },
    isAdmin: true,
  },
];
const links_filtered = computed(() => {
  const userIsAdmin = auth.is_admin();
  return links.filter((link) => {
    if (link.isAdmin) {
      return userIsAdmin;
    }
    return true;
  });
});
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
body {
  background-color: #fafafa;
}
</style>
