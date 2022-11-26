<template>
  <div class="row">
    <div class="col-3">
      <AttributesList @update="updateAttributes"></AttributesList>
    </div>
    <div class="col-9">
      <q-tabs v-model="currentTab" class="text-primary">
        <q-tab name="overview" icon="s_view_list" label="Overview" />
        <q-tab name="graphs" icon="s_bar_chart" label="Visualization" />
        <q-tab name="export" icon="s_file_download" label="Export" />
      </q-tabs>

      <!-- <q-table
        title="Data"
        :rows="data"
        :columns="columns"
        row-key="name"
        dense
      /> -->

      <LineGraph :data="data"></LineGraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@iot/services/http';
import { QTableColumn } from 'quasar';

import { IAttributeTelemetry } from '@iot/telemetry';
import AttributesList from '../../components/telemetry/attributesList.vue';
import LineGraph from '../../components/telemetry/LineGraph.vue';

const currentTab = ref('overview');

const data = ref<IAttributeTelemetry[]>([]);

const selectedAttributes = ref<string[]>([]);

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
    },
  });
  data.value = req.data;
}
</script>

<style scoped></style>
