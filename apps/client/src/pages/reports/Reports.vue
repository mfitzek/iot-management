<template>
  <div class="q-pa-md">
    <div class="row full-width justify-end">
      <div class="col-auto">
        <q-btn color="green" icon-right="add" label="Create new report" @click="void" />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-md-3 col-lg-2">
        <q-scroll-area style="height: 800px">
          <q-card>
            <q-card-section>
              <q-list separator>
                <q-item v-if="data.length === 0">No reports created</q-item>
                <q-item
                  clickable
                  v-ripple
                  v-for="report in data"
                  @click="showReport(report.id)"
                  dense
                  :to="{ name: 'ReportSettings', params: { id: report.id } }"
                >
                  <q-item-section>{{ report.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-scroll-area>
      </div>
      <div class="col">
        <q-card class="my-card" v-if="selectedReport" :key="selectedReport.id">
          <q-card-section title class="text-h5">
            {{ selectedReport.name }}
          </q-card-section>
          <q-card-section>
            <q-tabs v-model="tab" narrow-indicator dense align="left" class="text-primary">
              <q-route-tab
                ripple
                name="settings"
                icon="tune"
                label="Settings"
                :to="{ name: 'ReportSettings', params: { id: selectedReport.id } }"
              />
              <q-route-tab
                ripple
                name="data"
                icon="s_feed"
                label="Data"
                :to="{ name: 'ReportPreview', params: { id: selectedReport.id } }"
              />
              <q-route-tab ripple name="graph" icon="sym_o_monitoring" label="Graph" />
            </q-tabs>
          </q-card-section>
          <q-card-section>
            <router-view :key="selectedReport.id"></router-view>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@iot/services/http-axios';

const columns = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
];

const selectedReport = ref<Report | null>(null);
const tab = ref('settings');

interface Report {
  id: string;
  name: string;
}

const data = ref<Report[]>([]);

async function showReport(id: string) {
  selectedReport.value = data.value.find((report) => report.id === id) || null;
}

async function fetchUserReports() {
  const response = await axios.get('/reports');
  data.value = response.data;
}

fetchUserReports();
</script>

<style scoped>
.reports-list {
  height: 100%;
}
</style>
