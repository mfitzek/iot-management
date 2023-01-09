<template>
  <div class="row justify-between q-mb-md">
    <div class="text-h5">List of attributes</div>
    <q-btn
      color="green"
      label="Add attribute"
      icon-right="sym_o_add_circle"
      @click="addAttribute"
    ></q-btn>
  </div>
  <div class="row q-gutter-md">
    <div class="col">
      <q-table
        :rows="filterAttriubutes"
        :columns="columns"
        @row-click="rowClick"
        flat
        dense
        :pagination="{ rowsPerPage: 10 }"
      >
      </q-table>
    </div>
    <div class="col">
      <div class="q-gutter-sm q-mb-sm">
        <q-input v-model="selected.name" type="text" label="Name" filled />
        <q-select v-model="selected.type" type="text" label="Type" filled :options="typeOptions" />
        <div v-if="selected.id" class="q-gutter-sm">
          <q-btn color="green" label="Update" @click="updateCurrent()" />
          <q-btn color="red" label="Remove " @click="removeCurrent()" />
        </div>
        <div v-else>
          <q-btn color="primary" label="Create" @click="createCurrent()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAttribute } from '@iot/device';
import { QTableColumn } from 'quasar';
import { computed, ref } from 'vue';
import store, { updateCurrentDevice } from '../store';

const data = ref<IAttribute[]>(store.device?.attributes ?? []);

const typeOptions = ['string', 'number', 'object'];
const selected = ref<IAttribute>({ name: '', type: 'number' });

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'right' },
];

const filterAttriubutes = computed(() => data.value.filter((attr) => !attr.to_be_deleted));

function rowClick({}, row: IAttribute) {
  selected.value = { ...row };
}

function removeCurrent() {
  const attr = selected.value;
  if (attr) {
    const idx = data.value.findIndex((a) => a.id === attr.id);
    data.value[idx].to_be_deleted = true;
    updateDevice();
  }
  selected.value = { name: '', type: 'number' };
}

function createCurrent() {
  data.value.push({ ...selected.value });
  updateDevice();
}

function updateCurrent() {
  const attr = { ...selected.value };
  if (attr) {
    const idx = data.value.findIndex((a) => a.id === attr.id);
    data.value[idx] = attr;
    updateDevice();
  }
}

async function updateDevice() {
  if (store.device) {
    store.device.attributes = [...data.value];
    await updateCurrentDevice();
    data.value = store.device.attributes;
  }
}

function addAttribute() {
  const attr: IAttribute = { name: '', type: 'number' };
  selected.value = attr;
}
</script>

<style scoped></style>
