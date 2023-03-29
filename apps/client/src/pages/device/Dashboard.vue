<template>
  <div class="q-pa-md q-gutter-y-md">
    <CardsInfo :stats="stats"></CardsInfo>

    <div class="row">
      <Warnings></Warnings>
    </div>

    <div class="row">
      <div class="col">
        <DeviceList></DeviceList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardsInfo from '../../components/device/CardsInfo.vue';
import Warnings from '../../components/device/Warnings.vue';
import DeviceList from '../../components/device/List.vue';
import axios from '@iot/services/http-axios';
import { DashboardCountStats, DeviceDashboardData } from '@iot/device';
import { ref } from 'vue';

const stats = ref<DashboardCountStats>({
  devices: 0,
  attributes: 0,
  records: 0,
  warnings: 0,
});

async function fetchDashboardData() {
  const response = await axios.get<DeviceDashboardData>('device/dashboard');
  console.log(response.data);
  stats.value = response.data.stats;
}

fetchDashboardData();
</script>

<style scoped></style>
