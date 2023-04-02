<template>
  <q-table
    :rows="attributes"
    :columns="columns"
    row-key="name"
    flat
    :pagination="{ rowsPerPage: 0 }"
    dense
    hide-pagination
  />
</template>

<script setup lang="ts">
import axios  from '@iot/services/http-axios';
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const columns = [
  {
    name: 'device',
    label: 'Device',
    field: 'device',
    align: 'left',
  },
  {
    name: 'attribute',
    label: 'Attribute',
    field: 'attribute',
    align: 'left',
  },
  {
    name: 'min',
    label: 'Minimum',
    field: 'min',
    align: 'left',
  },
  {
    name: 'max',
    label: 'Maximum',
    field: 'max',
    align: 'left',
  },
  {
    name: 'avg',
    label: 'Average',
    field: 'avg',
    align: 'left',
  },
  {
    label: 'Records',
    name: 'records',
    field: 'records',
    align: 'left',
  },
];

const attributes = [
  {
    id: 'qweasdasxcasdf',
    device: 'thermometer',
    attribute: 'temp_room1',
    min: 18.0,
    max: 23.5,
    avg: 22.5,
    records: 1500,
  },
  {
    id: 'qweasdasxcasdf',
    device: 'thermometer',
    attribute: 'temp_room2',
    min: 18.0,
    max: 23.0,
    avg: 22.2,
    records: 1800,
  },
  {
    id: 'qweasdasxcasdf',
    device: 'thermometer',
    attribute: 'temp_room3',
    min: 18.0,
    max: 22.5,
    avg: 20.5,
    records: 500,
  },
];


</script>

<style scoped></style>
