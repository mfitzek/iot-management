<template>
  <q-table :columns="columns" :rows="rows" @row-click="clickDevice">
    <template #body-cell-status="{ row }">
      <q-td class="text-right">
        <q-badge rounded :color="rowStatus(row.status).color">
          <q-tooltip>{{ rowStatus(row.status).status }}</q-tooltip>
        </q-badge>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { DeviceListAdmin, DeviceStatusInfo } from '@iot/device';
import axios from '@iot/services/http-axios';
import { QTableColumn } from 'quasar';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const rows = reactive<DeviceListAdmin[]>([]);

async function getRows() {
  const req = await axios.get('devices/status/admin');
  rows.push(...req.data);
}

getRows();

const router = useRouter();

const columns: QTableColumn[] = [
  { name: 'user', label: 'User', field: 'user', align: 'left' },
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  { name: 'lastdata', label: 'Last data', field: 'lastData', align: 'left' },
  { name: 'status', label: 'Status', field: 'status' },
];

type DeviceStatus = {
  color: string;
  status: string;
};
function rowStatus(status?: string) {
  if (!status)
    return {
      color: 'grey',
      status: 'unknown',
    };

  const colors: { [state: string]: DeviceStatus } = {
    online: { color: 'green', status: 'online' },
    warning: { color: 'orange', status: 'problems occured' },
    offline: { color: 'red', status: 'offline' },
  };
  return colors[status] ?? 'red';
}

async function clickDevice({}, row: DeviceListAdmin) {
  router.push({ name: 'DeviceDetail', params: { id: row.id } });
}
</script>

<style scoped>
.test-table {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
