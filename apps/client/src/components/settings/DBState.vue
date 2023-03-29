<template>
  <div>
    <q-knob
      show-value
      readonly
      font-size="12px"
      v-model="progress"
      size="200px"
      :thickness="0.22"
      color="teal"
      track-color="grey-3"
      class="q-ma-md"
    >
      {{ progressLabel }}
    </q-knob>
  </div>
</template>

<script setup lang="ts">
import { Statistics } from '@iot/administration';
import { computed, ref } from 'vue';
import api from '@iot/services/http-axios';

const maxSize = ref(1);
const currentSize = ref(0);

const progress = computed(() => {
  return (currentSize.value / maxSize.value) * 100;
});

const progressLabel = computed(() => {
  const percent = Math.floor(progress.value);

  return `${currentSize.value} / ${maxSize.value} MB (${percent}%)`;
});

async function getStats() {
  const res = await api.get<Statistics>('/administration/statistics');
  const data = res.data;
  maxSize.value = Math.round(data.maxSizeMB * 100) / 100;
  currentSize.value = Math.round(data.currentSizeMB * 100) / 100;
}

getStats();

const color = computed(() => {
  if (progress.value >= 0.9) return 'red';
  if (progress.value >= 0.7) return 'orange';
  return 'green';
});
</script>

<style scoped></style>
