<template>
  <div class="row q-gutter-x-md">
    <div class="col">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">{{ props.stats.devices }}</div>
          <div class="text-subtitle2">Devices</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">{{ props.stats.attributes }}</div>
          <div class="text-subtitle2">Attributes</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">{{ props.stats.records }}</div>
          <div class="text-subtitle2">Records</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">{{ props.stats.warnings }}</div>
          <div class="text-subtitle2">Warnings</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DashboardCountStats } from '@iot/device';
const props = defineProps<{
  stats: DashboardCountStats;
}>();
</script>

<style scoped></style>
