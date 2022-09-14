<template>
  <div class="q-pa-md">
    <div class="row items-center justify-between">
      <div class="col-auto">
        <h3>Device list</h3>
      </div>
      <div class="col-auto">
        <q-btn color="green" icon-right="add" :to="{ name: 'DeviceCreate' }"
          >Add device</q-btn
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
import http from '@service/http';

const router = useRouter();

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'lastdata', label: 'Last data', field: 'last_data', align: 'left' },
  { name: 'status', label: 'Status', field: 'status' },
];

interface IDevice {
  id: number;
  name: string;
  type: string;
  last_data: string;
  status: string;
}

const rows: IDevice[] = [
  {
    id: 100,
    name: 'Test',
    type: 'X752-AB',
    last_data: '12.09.2022 13:52',
    status: 'online',
  },
  {
    id: 101,
    name: 'Test2',
    type: 'S3X-BD',
    last_data: '12.09.2022 10:52',
    status: 'warning',
  },
  {
    id: 102,
    name: 'Test3',
    type: 'S3X-CMD',
    last_data: '01.08.2022 07:52',
    status: 'error',
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

async function clickDevice({}, row: IDevice) {
  const req = await http.get('/Any?safe-mode');

  console.log(req.data);

  console.log('clicked device', row.id);
  router.push({ name: 'DeviceDetail', params: { id: row.id } });
}
</script>

<style scoped></style>
