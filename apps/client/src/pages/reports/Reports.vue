<template>
  <div class="q-pa-md">
    <div class="row full-width justify-end">
      <div class="col-auto">
        <q-btn
          color="green"
          icon-right="add"
          label="Create new report"
          :to="{ name: 'CreateReport' }"
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mt-md">
      <div class="col-md-3 col-lg-2">
        <q-scroll-area style="height: 800px">
          <q-card>
            <q-card-section>
              <div class="text-h5">List of reports</div>
            </q-card-section>
            <q-card-section>
              <q-list separator>
                <q-item v-if="data.length === 0">No reports created</q-item>
                <q-item
                  clickable
                  v-ripple
                  v-for="report in data"
                  :to="{ name: 'ReportSettings', params: { id: report.id } }"
                  dense
                >
                  <q-item-section>{{ report.name }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-scroll-area>
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useReportsStore } from '../../store/reports';

const reports = useReportsStore();
reports.fetchUserReports();

const data = computed(() => reports.reports);
</script>

<style scoped>
.reports-list {
  height: 100%;
}
</style>
