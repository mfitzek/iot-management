<template>
  <div>
    <Line
      :chart-data="chartData"
      :chart-options="chartOptions"
      height="400px"
    />
  </div>
</template>

<script setup lang="ts">
import { IAttributeTelemetry } from '@iot/telemetry';
import { computed } from 'vue';

import 'chartjs-adapter-moment';

import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  TimeSeriesScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(
  TimeSeriesScale,
  TimeScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement
);

const props = defineProps<{
  data: IAttributeTelemetry[];
}>();

const chartOptions: ChartOptions = {
  responsive: true,
  scales: {
    x: {
      type: 'time',
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
};

const chartData = computed(() => {
  const displayableData = props.data.map((attr) => {
    return {
      ...attr,
      telemetry: attr.telemetry.filter((t) => {
        return attr.type === 'number' && Number.isFinite(Number(t.value));
      }),
    };
  });

  const result: ChartData = {
    datasets: displayableData.map((attr): ChartDataset<'line'> => {
      return {
        label: attr.name,
        borderColor: randomColor(),
        data: attr.telemetry.map((t) => {
          return { x: t.createdAt, y: Number(t.value) };
        }),
      };
    }),
  };
  return result;
});

function randomColor() {
  return '#' + Math.round(0xffffff * Math.random()).toString(16);
}
</script>

<style scoped></style>
