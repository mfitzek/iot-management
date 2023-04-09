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
import { AttributeData } from '@iot/reports';
import axios from '@iot/services/http-axios';
import { ref } from 'vue';
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

const attributes = ref<AttributeData[]>([]);

async function fetchData() {
  const { data } = await axios.get<AttributeData[]>(`/reports/${props.id}/data`);
  attributes.value = data;
}

fetchData();
</script>

<style scoped></style>
