<template>
  <q-card class="my-card">
    <q-card-section title class="text-h5"> Create new report </q-card-section>
    <q-card-section>
      <div class="q-gutter-md">
        <div class="row">
          <q-btn color="green" icon-right="add" label="Add atttribute" @click="addDialog = true" />
          <q-space />
          <q-btn color="primary" icon-right="save" label="Create report" @click="saveSettings()" />
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
    </q-card-section>
  </q-card>

  <AddDeviceAttributeDialog v-model="addDialog" @addItem="addItem"></AddDeviceAttributeDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AddDeviceAttributeDialog from '../../components/reports/AddDeviceAttributeDialog.vue';
import { ReportDataAttribute, ReportSettings } from '@iot/reports';
import { useReportsStore } from '../../store/reports';
import { useRouter } from 'vue-router';

const router = useRouter();

const reports = useReportsStore();

const addDialog = ref(false);
const dayMs = 24 * 60 * 60 * 1000;

const name = ref('');
const items = ref<ReportDataAttribute[]>([]);
const interval = ref(7 * dayMs);
const email = ref(false);

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
  },
  {
    label: '1 Week',
    value: dayMs * 7,
  },
  {
    label: '1 Month',
    value: dayMs * 30,
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

  const report = await reports.createReport(settings);

  router.push({ name: 'ReportSettings', params: { id: report.id } });
}
</script>

<style scoped></style>
