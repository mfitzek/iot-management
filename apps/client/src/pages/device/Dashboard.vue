<template>
  <div class="q-pa-md q-gutter-y-md">
    <CardsInfo></CardsInfo>

    <div class="row">
      <div class="col-6">
        <DeviceList></DeviceList>
      </div>
      <div class="col-6">
        <Warnings></Warnings>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardsInfo from '../../components/device/CardsInfo.vue';
import Warnings from '../../components/device/Warnings.vue';
import DeviceList from './DeviceList.vue';
</script>

<style scoped></style>
