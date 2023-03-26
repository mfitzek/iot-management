<template>
  <div class="q-pa-md q-gutter-y-md">
    <CardsInfo></CardsInfo>

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
</script>

<style scoped></style>
