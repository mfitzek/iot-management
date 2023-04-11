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
    name: 'icon',
    field: 'icon',
    label: '',
    align: 'right',
  },
];

const rows = [
  {
    name: 'LivingRoomMeteo',
    status: 'Not configured',
    icon: 'sym_o_warning',
    color: 'warning',
  },
];
</script>

<style scoped></style>
