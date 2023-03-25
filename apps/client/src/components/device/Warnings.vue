<template>
  <q-table title="Warnings" :rows="rows" :columns="columns" row-key="name" dense>
    <template #body-cell-icon="{ row }">
      <q-td class="text-right">
        <q-icon :name="row.icon" :color="row.color" size="1.6em" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
  },
  {
    name: 'status',
    field: 'status',
    label: 'Status',
    align: 'left',
  },
  {
    name: 'lastUpdate',
    field: 'lastUpdate',
    label: 'Last update',
    align: 'left',
  },
  {
    name: 'icon',
    field: 'icon',
    label: '',
    align: 'right',
  },
];

const rows = [
  {
    name: 'Device 1',
    status: 'Connection problem',
    lastUpdate: '2021-01-01 12:00:00',
    icon: 'sym_o_error',
    color: 'red',
  },
  {
    name: 'Device 2',
    status: 'No sensor data',
    lastUpdate: '2021-01-01 12:00:00',
    icon: 'sym_o_warning',
    color: 'warning',
  },
];
</script>

<style scoped></style>
