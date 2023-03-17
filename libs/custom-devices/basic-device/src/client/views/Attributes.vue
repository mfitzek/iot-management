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
import { IAttribute, UpdateDevice } from '@iot/device';
import api from '@iot/services/http-axios';
import { QTableColumn } from 'quasar';
import { computed, ref } from 'vue';
import store, { fetchDevice } from '../store';

type Attribute = {
  id?: string;
  name: string;
  type: string;
};

const data = computed(() => {
  return store.device?.attributes ?? [];
});

const typeOptions = ['string', 'number', 'object'];
const selected = ref<Attribute>({ name: '', type: 'number' });

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'right' },
];

const filterAttriubutes = computed(() => data.value.filter((attr) => !attr.to_be_deleted));

function rowClick({}, row: IAttribute) {
  selected.value = { ...row };
}

async function removeCurrent() {
  const attr = selected.value;
  if (attr && attr.id && store.device) {
    const id = store.device.id;
    const updateDevice: UpdateDevice = {
      id: id,
      name: store.device.name,
      attributes: {
        create: [],
        update: [],
        remove: [{ id: attr.id }],
      },
    };
    await api.post(`device/${id}`, updateDevice);
    await fetchDevice(id);
  }

  selected.value = { name: '', type: 'number' };
}

async function createCurrent() {
  const attr = selected.value;
  if (attr && store.device) {
    const id = store.device.id;
    const updateDevice: UpdateDevice = {
      id: id,
      name: store.device.name,
      attributes: {
        create: [{ name: attr.name, type: attr.type }],
        update: [],
        remove: [],
      },
    };
    await api.post(`device/${id}`, updateDevice);
    await fetchDevice(id);
  }
}

async function updateCurrent() {
  const attr = selected.value;
  if (attr && attr.id && store.device) {
    const id = store.device.id;
    const updateDevice: UpdateDevice = {
      id: id,
      name: store.device.name,
      attributes: {
        create: [],
        update: [{ id: attr.id, name: attr.name, type: attr.type }],
        remove: [],
      },
    };
    await api.post(`device/${id}`, updateDevice);
    await fetchDevice(id);
  }
}

function addAttribute() {
  const attr: Attribute = { name: '', type: 'number' };
  selected.value = attr;
}
</script>

<style scoped></style>
