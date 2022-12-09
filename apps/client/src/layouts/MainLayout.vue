<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> IoT Manager </q-toolbar-title>

        <UserInfo></UserInfo>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" showIfAbove side="left" bordered>
      <!-- drawer content -->
      <q-list>
        <q-item v-for="(link, index) in links_filtered" :key="index" :to="link.route">
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

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import UserInfo from '@components/toolbar/UserInfo.vue';
export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);
    const links = [
      {
        name: 'Device',
        icon: 'sym_o_table_lamp',
        route: { name: 'DeviceList' },
        auth_level: 0,
      },
      {
        name: 'Data',
        icon: 'sym_o_monitoring',
        route: { name: 'Telemetry' },
        auth_level: 0,
      },
      {
        name: 'Administration',
        icon: 'sym_o_settings',
        route: { name: 'SettingsDashboard' },
        auth_level: 2,
      },
    ];
    const links_filtered = computed(() => {
      return links.filter((link) => {
        return true;
      });
    });
    function toggleLeftDrawer() {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      links_filtered,
    };
  },
  components: { UserInfo },
});
</script>
