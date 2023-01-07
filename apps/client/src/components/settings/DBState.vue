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
import { Statistics } from '@iot/administration';
import { computed, ref } from 'vue';
import api from '@iot/services/http';

const maxSize = ref(1);
const currentSize = ref(0);

const progress = computed(() => {
  return currentSize.value / maxSize.value;
});

const progressLabel = computed(() => {
  const percent = Math.floor(progress.value * 100);

  return `${currentSize.value} / ${maxSize.value} MB (${percent}%)`;
});

async function getStats() {
  const res = await api.get<Statistics>('/administration/statistics');
  const data = res.data;
  maxSize.value = data.maxSizeMB;
  currentSize.value = data.currentSizeMB;
}

getStats();

const color = computed(() => {
  if (progress.value >= 0.9) return 'red';
  if (progress.value >= 0.7) return 'orange';
  return 'green';
});
</script>

<style scoped></style>
