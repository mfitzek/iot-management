<template>
  <div class="text-h4">23 °C</div>
  <div>Humidity 60%</div>
  <div>Location: Home / Living room</div>
</template>

<script setup lang="ts">
import { useThermometerStore } from './store';

const store = useThermometerStore();
</script>

<style scoped></style>
