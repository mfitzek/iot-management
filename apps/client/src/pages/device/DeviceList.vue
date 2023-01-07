<template>
  <div class="q-pa-md">
    <div class="row items-center justify-between">
      <div class="col-auto">
        <h3>Device list</h3>
      </div>
      <div class="col-auto">
        <q-btn color="green" icon-right="add" :to="{ name: 'DeviceCreate' }"
          >Create new device</q-btn
        >
      </div>
    </div>
    <div>
      <q-table :columns="columns" :rows="rows" @row-click="clickDevice">
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
import { useRouter } from 'vue-router';
import { IDeviceListRow } from '@iot/device';
import http from '@iot/services/http';
import { reactive } from 'vue';

const rows = reactive<IDeviceListRow[]>([]);

async function getRows() {
  const req = await http.get('device/list');
  rows.push(...req.data);
}

getRows();

const router = useRouter();

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'lastdata', label: 'Last data', field: 'last_data', align: 'left' },
  { name: 'status', label: 'Status', field: 'status' },
];

const row_status = (status: string) => {
  const colors: { [state: string]: string } = {
    online: 'green',
    warning: 'orange',
    offline: 'red',
  };
  return colors[status] ?? 'red';
};

async function clickDevice({}, row: IDeviceListRow) {
  router.push({ name: 'DeviceDetail', params: { id: row.id } });
}
</script>

<style scoped></style>
