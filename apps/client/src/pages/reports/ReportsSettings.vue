<template>
  <div class="q-gutter-md">
    <div class="row">
      <q-btn color="green" icon-right="add" label="Add atttribute" @click="addDialog = true" />
      <q-space />
      <q-btn color="primary" icon-right="save" label="Save settings" @click="saveSettings()" />
    </div>
    <q-input v-model="name" type="text" label="Report name" filled />

    <q-list separator dense bordered>
      <q-item v-for="item in items" :key="item.attributeId">
        <q-item-section>
          <q-item-label>{{ item.attribute }}</q-item-label>
          <q-item-label caption>{{ item.device }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn color="red" icon="delete" round @click="deleteItem(item.attributeId)" flat />
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
import { ReportSettings } from '@iot/reports';

const addDialog = ref(false);
const name = ref('Name');

const items = ref([
  { attributeId: 'item1', device: 'Device 1', attribute: 'Attribute 1' },
  { attributeId: 'item2', device: 'Device 2', attribute: 'Attribute 2' },
  { attributeId: 'item3', device: 'Device 3', attribute: 'Attribute 3' },
]);

const deleteItem = (attributeId: string) => {
  items.value = items.value.filter((item) => item.attributeId !== attributeId);
};

const dayMs = 24 * 60 * 60 * 1000;
const options = [
  {
    label: '1 Day',
    value: dayMs,
    description: 'One day interval',
  },
  {
    label: '1 Week',
    value: dayMs * 7,
    description: 'One week interval',
  },
  {
    label: '1 Month',
    value: dayMs * 30,
    description: 'One month interval',
  },
];
const interval = ref(dayMs * 7);
const email = ref(false);

async function saveSettings() {
  const settings: ReportSettings = {
    id: 'TO DO',
    name: name.value,
    intervalMs: interval.value,
    sendEmail: email.value,
    attributes: items.value.map((item) => item.attributeId),
  };
  console.log(settings);
}
</script>

<style scoped></style>
