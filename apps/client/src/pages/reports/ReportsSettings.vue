<template>
  <div class="q-gutter-md">
    <div class="row">
      <q-btn color="green" icon-right="add" label="Add atttribute" @click="addDialog = true" />
      <q-space />
      <q-btn color="primary" icon-right="save" label="Save settings" @click="saveSettings()" />
    </div>
    <q-input v-model="name" type="text" label="Report name" filled />

    <q-list separator dense bordered>
      <q-item v-for="item in items" :key="item.id">
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
          <q-item-label caption>{{ item.device }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn color="red" icon="delete" round @click="deleteItem(item.id)" flat />
        </q-item-section>
      </q-item>
      <q-item v-if="items.length === 0">
        <q-item-section>
          <q-item-label>No attributes added</q-item-label>
          <q-item-label caption>Click "Add attribute" button to add new attribute</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-select v-model="interval" :options="options" label="Interval" filled map-options />
    <q-toggle v-model="email" color="green" label="Send report to email " />
  </div>

  <AddDeviceAttributeDialog v-model="addDialog" @addItem="addItem"></AddDeviceAttributeDialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import AddDeviceAttributeDialog from '../../components/reports/AddDeviceAttributeDialog.vue';
import { ReportData, ReportDataAttribute, ReportSettings } from '@iot/reports';
import { useReportsStore } from '../../store/reports';

const props = defineProps<{
  id: string;
}>();

const reports = useReportsStore();

const addDialog = ref(false);
const dayMs = 24 * 60 * 60 * 1000;

const name = ref('');
const items = ref<ReportDataAttribute[]>([]);
const interval = ref(7 * dayMs);
const email = ref(false);

watch(
  () => reports.getCurrentReport,
  (report: ReportData | undefined) => {
    console.log('Report changed', report?.name);

    if (report) {
      name.value = report.name;
      items.value = report.attributes;
      interval.value = report.intervalMs;
      email.value = report.sendEmail;
    }
  },
  { immediate: true }
);

const deleteItem = (attributeId: string) => {
  items.value = items.value.filter((item) => item.id !== attributeId);
};

const addItem = (item) => {
  items.value.push(item);
};

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

async function saveSettings() {
  const int = interval.value as any;
  if (int && typeof int === 'object') {
    interval.value = int.value;
  }
  const settings: ReportSettings = {
    name: name.value,
    intervalMs: interval.value,
    sendEmail: email.value,
    attributes: items.value.map((item) => item.id),
  };

  const report = await reports.updateReport(props.id, settings);
}
</script>

<style scoped></style>
