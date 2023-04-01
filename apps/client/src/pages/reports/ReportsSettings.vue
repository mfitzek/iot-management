<template>
  <div class="q-gutter-md">
    <div class="row">
      <q-btn color="green" icon-right="add" label="Add atttribute" @click="addDialog = true" />
      <q-space />
      <q-btn color="primary" icon-right="save" label="Save settings" @click="void" />
    </div>
    <q-input v-model="name" type="text" label="Report name" filled />   

    <q-list separator dense bordered>
      <q-item v-for="item in items" :key="item.id">
        <q-item-section>
          <q-item-label>{{ item.attribute }}</q-item-label>
          <q-item-label caption>{{ item.device }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn color="red" icon="delete" round @click="deleteItem(item.id)" flat />
        </q-item-section>
      </q-item>
    </q-list>
    <q-select v-model="interval" :options="options" label="Interval" filled map-options />
    <q-toggle v-model="email" color="green" label="Send report to email " />
  </div>

  <AddDeviceAttributeDialog v-model="addDialog"></AddDeviceAttributeDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddDeviceAttributeDialog from '../../components/reports/AddDeviceAttributeDialog.vue';

const addDialog = ref(false);
const name = ref('Name');

const items = ref([
  { id: 'item1', device: 'Device 1', attribute: 'Attribute 1' },
  { id: 'item2', device: 'Device 2', attribute: 'Attribute 2' },
  { id: 'item3', device: 'Device 3', attribute: 'Attribute 3' },
]);

const deleteItem = (id: string) => {
  items.value = items.value.filter((item) => item.id !== id);
};

const options = [
  {
    label: '1 Day',
    value: 'dayly',
    description: 'One day interval',
  },
  {
    label: '1 Week',
    value: 'weekly',
    description: 'One week interval',
  },
  {
    label: '1 Month',
    value: 'monthly',
    description: 'One month interval',
  },
];
const interval = ref('weekly');
const email = ref(false);
</script>

<style scoped></style>
