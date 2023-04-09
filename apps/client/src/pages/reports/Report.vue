<template>
  <q-card class="my-card">
    <q-card-section title class="text-h5">
      {{ selectedReport?.name }}
    </q-card-section>
    <q-card-section>
      <q-tabs v-model="tab" narrow-indicator dense align="left" class="text-primary">
        <q-route-tab
          ripple
          name="settings"
          icon="tune"
          label="Settings"
          :to="{ name: 'ReportSettings', params: { id: selectedReport?.id } }"
          exact
        />
        <q-route-tab
          ripple
          name="data"
          icon="s_feed"
          label="Data"
          exact
          :to="{ name: 'ReportPreview', params: { id: selectedReport?.id } }"
        />
        <q-route-tab ripple name="graph" icon="sym_o_monitoring" label="Graph" disable />
      </q-tabs>
    </q-card-section>
    <q-card-section>
      <router-view></router-view>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useReportsStore } from '../../store/reports';

const props = defineProps<{
  id: string;
}>();

const reports = useReportsStore();

watch(
  () => props.id,
  (id) => {
    reports.setCurrentReport(id);
  },
  { immediate: true }
);

const selectedReport = computed(() => reports.getCurrentReport);

const tab = ref('settings');
</script>

<style scoped></style>
