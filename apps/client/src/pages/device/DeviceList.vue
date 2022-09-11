<template>
  <div class="q-pa-md">
    <div class="row items-center justify-between">
      <div class="col-auto">
        <h1>Device list</h1>
      </div>
      <div class="col-auto">
        <q-btn color="green" icon-right="add">Add device</q-btn>
      </div>
    </div>
    <div>
    <q-table :columns="columns" :rows="rows">
      <template #body-cell-status="{ row }">
        <q-td class="text-right">
          <q-badge rounded :color="row_status(row.status)"></q-badge>
        </q-td>
      </template>
    </q-table>
  </div>
</div>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'lastdata', label: 'Last data', field: 'last_data', align: 'left' },
  { name: 'status', label: 'Status', field: 'status' },
];

const rows = [
  {
    name: 'Test',
    type: 'X752-AB',
    last_data: '11.09.2022 13:52',
    status: 'online',
  },
];

const row_status = (status: string) => {
  const colors: { [state: string]: string } = {
    online: 'green',
    warning: 'orange',
    offline: 'red',
  };
  return colors[status] ?? 'red';
};
</script>

<style scoped></style>
