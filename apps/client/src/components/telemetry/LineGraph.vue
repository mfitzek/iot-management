<template>
  <div class="graph">
    <q-inner-loading
      :showing="loadingData"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <Line :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import axios from '@iot/services/http-axios';
import { ISearchTelemetry, ITelemetryDevice, ITelemetryResponse } from '@iot/telemetry';
import zoomPlugin from 'chartjs-plugin-zoom';
import { computed, ref, watch, watchEffect } from 'vue';
import 'chartjs-adapter-moment';
import {
  CategoryScale,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  TimeSeriesScale,
  TimeScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  zoomPlugin
);

const props = defineProps<{
  filter: ISearchTelemetry;
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
  parsing: {
    xAxisKey: 'createdAt',
    yAxisKey: 'value',
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: 'x',
      },
    },
  },
  transitions: {
    zoom: {
      animation: {
        duration: 0,
      },
    },
  },
  animation: false,
  borderWidth: 2,
};

const telemetryData = ref<ITelemetryDevice[]>([]);
const loadingData = ref(false);

const chartData = computed<ChartData>(() => {
  const data = [];
  for (const dev of telemetryData.value) {
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
        data: attr.telemetry as any,
      };
    }),
  };
  return result;
});

function randomColor() {
  return '#' + Math.round(0xffffff * Math.random()).toString(16);
}

watchEffect(async () => {
  loadingData.value = true;
  const req = await axios.get<ITelemetryResponse>('/telemetry', {
    params: {
      attr: props.filter.attribute_ids,
      start: props.filter.date_from?.getTime(),
      end: props.filter.date_to?.getTime(),
    },
  });
  telemetryData.value = req.data.result;
  loadingData.value = false;
});
</script>

<style scoped>
.graph {
  max-width: 100%;
}
</style>
