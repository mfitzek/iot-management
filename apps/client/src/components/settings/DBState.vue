<template>
  <div>
    <q-linear-progress
      size="25px"
      :value="progress"
      rounded
      :color="color"
      :track-color="color"
      class="q-mt-sm"
    >
      <div class="text-primary">
        <div class="absolute-full flex flex-center">
          <q-badge color="primary" text-color="white" :label="progressLabel" />
        </div>
      </div>
    </q-linear-progress>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const maxSize = 4000;
const currentSize = 400;

const progress = computed(() => {
  return currentSize / maxSize;
});

const progressLabel = computed(() => {
  const percent = Math.floor(progress.value * 100);

  return `${currentSize} / ${maxSize} MB (${percent}%)`;
});

const color = computed(() => {
  if (progress.value >= 0.9) return 'red';
  if (progress.value >= 0.7) return 'orange';
  return 'green';
});
</script>

<style scoped></style>
