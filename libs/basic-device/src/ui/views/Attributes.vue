<template>
  <div class="row q-gutter-md">
    <div class="col">
      <q-table :rows="data" :columns="columns" @row-click="rowClick">
        <template #bottom>
          <q-btn
            color="primary"
            label="Add attribute"
            @click="addAttribute"
          ></q-btn>
        </template>
      </q-table>
    </div>
    <div class="col">
      <div v-if="selected" class="q-gutter-sm q-mb-sm">
        <q-input v-model="name" type="text" label="Name" filled />
        <q-select
          v-model="type"
          type="text"
          label="Type"
          filled
          :options="typeOptions"
        />
        <q-btn color="green" label="Update" />
        <q-btn color="red" label="Remove " />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAttribute } from '@iot/device';
import { QTableColumn } from 'quasar';
import { ref } from 'vue';

const data = ref<IAttribute[]>([
  { name: 'test', type: 'string' },
  { name: 'test2', type: 'string' },
]);

const name = ref('');
const type = ref('');
const typeOptions = ['string', 'number', 'object'];
const selected = ref<IAttribute | null>(null);

const columns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left' },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
];

function rowClick({}, row: IAttribute) {
  selected.value = row;
  name.value = row.name;
  type.value = row.type;
}

function addAttribute() {
  const attr: IAttribute = { name: '', type: 'number' };
  data.value.push(attr);

  rowClick({}, attr);
}
</script>

<style scoped></style>
