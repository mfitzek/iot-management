<template>
  <div class="graph">
    <Line :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ITelemetryDevice } from '@iot/telemetry';
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
  ScatterDataPoint,
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
  data: ITelemetryDevice[];
}>();

const chartOptions: ChartOptions = {
  responsive: true,
  aspectRatio: 2,
  scales: {
    x: {
      type: 'time',
      time: {
        tooltipFormat: 'DD.MM.YYYY HH:mm:ss',
        displayFormats: {
          hour: 'DD.MM - HH:mm',
          minute: 'HH:mm',
          second: 'HH:mm:ss',
          day: 'DD.MM',
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  borderWidth: 2,
};

const chartData = computed<ChartData>(() => {
  const data = [];
  for (const dev of props.data) {
    data.push(...dev.attributes);
  }

  const displayableData = data.map((attr) => {
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
          const point: ScatterDataPoint = {
            x: t.createdAt,
            y: Number(t.value),
          };
          return point;
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

<style scoped>
.graph {
  max-width: 100%;
}
</style>
