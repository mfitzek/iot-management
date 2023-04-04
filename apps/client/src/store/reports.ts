import { ReportData, ReportSettings } from '@iot/reports';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import axios from '@iot/services/http-axios';

async function fetchReports() {
  const response = await axios.get<ReportData[]>('/reports');
  return response.data;
}

export const useReportsStore = defineStore('reports', () => {
  const reports = ref<ReportData[]>([]);
  const currentReportId = ref<string | null>(null);

  function setCurrentReport(id: string) {
    currentReportId.value = id;
  }

  async function fetchUserReports() {
    reports.value = await fetchReports();
  }

  const getCurrentReport = computed(() =>
    reports.value.find((report) => report.id === currentReportId.value)
  );

  async function createReport(report: ReportSettings) {
    const response = await axios.post<ReportData>('/reports', report);
    const created = response.data;
    reports.value.push(created);
    return created;
  }

  return {
    reports,
    currentReportId,
    setCurrentReport,
    fetchUserReports,
    getCurrentReport,
    createReport,
  };
});
