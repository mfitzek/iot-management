<template>
  <div>
    <div class="row q-mt-sm q-col-gutter-md" v-for="dev of data" :key="dev.id">
      <div class="col">
        Device: {{ dev?.name }}
        <div class="row q-mb-sm">
          <div class="col">Attribute</div>
          <div class="col">Type</div>
          <div class="col">Collected</div>
          <div class="col">Last date</div>
          <div class="col">Last value</div>
        </div>
        <hr />
        <div class="row" v-for="a of dev?.attributes">
          <div class="col">{{ a.name }}</div>
          <div class="col">{{ a.type }}</div>
          <div class="col">{{ a.collected }}</div>
          <div class="col">{{ getLastDate(a) }}</div>
          <div class="col">{{ getLastValue(a) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  AttributeTelemetryStats,
  DeviceTelemetryStats,
  ISearchTelemetry,
  ITelemetryAttribute,
  SearchTelemetryStats,
} from '@iot/telemetry';
import { ref, watch } from 'vue';
import axios from '@iot/services/http-axios';

const props = defineProps<{
  filter: ISearchTelemetry;
}>();

watch(
  () => props.filter,
  () => {
    fetchStatsData();
  },
  { deep: true }
);

const data = ref<DeviceTelemetryStats[]>([]);

function getLastDate(attribute: AttributeTelemetryStats) {
  const last = attribute.last;
  if (!last) {
    return 'NA';
  }

  const lastDate = new Date(last.createdAt);

  return lastDate.toLocaleString();
}

function getLastValue(attribute: AttributeTelemetryStats) {
  const last = attribute.last;
  return last?.value ?? 'NA';
}

async function fetchStatsData() {
  const req = await axios.get<DeviceTelemetryStats[]>('/telemetry/stats', {
    params: {
      attr: props.filter.attribute_ids,
      start: props.filter.date_from?.getTime(),
      end: props.filter.date_to?.getTime(),
    },
  });
  data.value = req.data;
}
</script>

<style scoped></style>
