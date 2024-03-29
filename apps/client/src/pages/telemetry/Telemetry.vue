<template>
  <div class="row q-mx-md">
    <div class="col-3">
      <AttributesList @update="updateAttributes"></AttributesList>
    </div>
    <div class="col-9 q-mt-md">
      <div class="row q-gutter-md justify-center items-center">
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
        <div>
          <q-btn color="primary" icon="s_sync" round @click="fetchTelemetryData">
            <q-tooltip> Refresh data </q-tooltip>
          </q-btn>
        </div>
      </div>

      <q-tabs v-model="currentTab" class="text-primary">
        <q-tab name="overview" icon="s_view_list" label="Overview" />
        <q-tab name="graphs" icon="s_bar_chart" label="Visualization" />
        <q-tab name="export" icon="s_file_download" label="Export" />
      </q-tabs>

      <div class="row q-pa-md">
        <div class="col" v-if="currentTab === 'overview'">
          <AttributesStats :filter="filter"></AttributesStats>
        </div>
        <div class="col" v-if="currentTab === 'graphs'">
          <LineGraph :filter="filter"></LineGraph>
        </div>
        <div class="col" v-if="currentTab === 'export'">
          <DataExport :filter="filter"></DataExport>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { ISearchTelemetry } from '@iot/telemetry';
import AttributesStats from '../../components/telemetry/AttributesStats.vue';
import LineGraph from '../../components/telemetry/LineGraph.vue';
import AttributesList from '../../components/telemetry/attributesList.vue';

import InputDatePicker from '../../components/input/InputDatePicker.vue';
import DataExport from '../../components/telemetry/DataExport.vue';

const currentTab = ref('overview');

const selectedAttributes = ref<string[]>([]);

const dateFrom = ref<Date | undefined>(undefined);
const dateTo = ref<Date | undefined>(undefined);

const filter = computed<ISearchTelemetry>(() => {
  return {
    attribute_ids: selectedAttributes.value,
    date_from: dateFrom.value,
    date_to: dateTo.value,
  };
});

function updateAttributes(ids: string[]) {
  selectedAttributes.value = ids;
}
</script>

<style scoped></style>
