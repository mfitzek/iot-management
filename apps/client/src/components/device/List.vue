<template>
  <q-table :columns="columns" :rows="filteredRows" @row-click="clickDevice" title="Device list">
    <template v-slot:top-right>
      <q-input outlined dense v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

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
import { DeviceStatusInfo } from '@iot/device';
import axios from '@iot/services/http-axios';
import { QTableColumn } from 'quasar';
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const rows = reactive<DeviceStatusInfo[]>([]);
const filter = ref('');

const filteredRows = computed(() => {
  if (!filter.value) return rows;
  const searchValue = filter.value.toLowerCase();

  return rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchValue) || row.type.toLowerCase().includes(searchValue)
  );
});

async function getRows() {
  const req = await axios.get('devices/shortlist');
  rows.push(...req.data);
}

getRows();

const router = useRouter();

const columns: QTableColumn[] = [
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

async function clickDevice({}, row: DeviceStatusInfo) {
  router.push({ name: 'DeviceDetail', params: { id: row.id } });
}
</script>

<style scoped></style>
