<template>
  <div class="row q-gutter-md">
    <div class="col">
      <q-table :rows="data" :columns="columns" @row-click="rowClick">
      </q-table>
    </div>
    <div class="col">
      <div v-if="selected" class="q-gutter-sm q-mb-sm">
        <q-input v-model="selected.name" type="text" label="Name" filled />
        <q-select
          v-model="selected.type"
          type="text"
          label="Type"
          filled
          :options="typeOptions"
        />
        <q-btn color="green" label="Update" />
        <q-btn color="red" label="Remove " @click="removeCurrent"/>

      </div>
      <q-btn
            color="primary"
            label="Add attribute"
            @click="addAttribute"
          ></q-btn>
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

function removeCurrent(){
  const attr = selected.value;
  if(attr){
    const idx = data.value.indexOf(attr);
    data.value.splice(idx,1);
  }

  selected.value = null;
}

function addAttribute() {
  const attr: IAttribute = { name: '', type: 'number' };
  data.value.push(attr);

  rowClick({}, attr);
}
</script>

<style scoped></style>
