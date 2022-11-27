<template>
  <div class="row">
    <div class="col-3">
      <AttributesList @update="updateAttributes"></AttributesList>
    </div>
    <div class="col-9 q-mt-md">
      <div class="row q-gutter-md justify-center">
        <InputDatePicker
          v-model="dateFrom"
          filled
          label="Search from date"
          @update:modelValue="fetchTelemetryData()"
        />
        <InputDatePicker
          v-model="dateTo"
          filled
          label="Search to date"
          @update:modelValue="fetchTelemetryData()"
        />
      </div>

      <q-tabs v-model="currentTab" class="text-primary">
        <q-tab name="overview" icon="s_view_list" label="Overview" />
        <q-tab name="graphs" icon="s_bar_chart" label="Visualization" />
        <q-tab name="export" icon="s_file_download" label="Export" />
      </q-tabs>

      <div class="row q-pa-md">
        <div class="col" v-if="currentTab === 'overview'">
          <AttributesStats :data="data"></AttributesStats>
        </div>
        <div class="col" v-if="currentTab === 'graphs'">
          <LineGraph :data="data"></LineGraph>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@iot/services/http';
import { date, QTableColumn } from 'quasar';

import { IAttributeTelemetry } from '@iot/telemetry';
import AttributesList from '../../components/telemetry/attributesList.vue';
import AttributesStats from '../../components/telemetry/AttributesStats.vue';
import LineGraph from '../../components/telemetry/LineGraph.vue';

import { InputDatePicker } from '@iot/vue-components';

const currentTab = ref('overview');

const data = ref<IAttributeTelemetry[]>([]);

const selectedAttributes = ref<string[]>([]);

const dateFrom = ref<Date | undefined>(undefined);
const dateTo = ref<Date | undefined>(undefined);

function updateAttributes(ids: string[]) {
  selectedAttributes.value = ids;
  fetchTelemetryData();
}

const columns: QTableColumn[] = [
  { label: 'Created at', name: 'created', field: 'createdAt' },
  { label: 'Value', name: 'value', field: 'value' },
];

async function fetchTelemetryData() {
  const req = await api.get<IAttributeTelemetry[]>('/telemetry', {
    params: {
      attr: [...selectedAttributes.value],
      start: dateFrom.value?.getTime(),
      end: dateTo.value?.getTime(),
    },
  });
  data.value = req.data;
}
</script>

<style scoped></style>
