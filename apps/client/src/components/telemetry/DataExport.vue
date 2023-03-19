<template>
  <div class="row q-gutter-md">
    <div class="col-6">
      <q-select
        v-model="exportFormat"
        :options="supportedExportFormats"
        label="Export Format"
        filled
      />
    </div>

    <q-btn color="primary" icon="s_file_download" label="Download" @click="downloadData()" />
  </div>
</template>

<script setup lang="ts">
import { ISearchTelemetry, supportedExportFormats, FormatType } from '@iot/telemetry';
import { ref } from 'vue';
import api from '@iot/services/http-axios';

const props = defineProps<{
  filter: ISearchTelemetry;
}>();

const exportFormat = ref<FormatType>('JSON');

async function downloadData() {
  const req = await api.get('/telemetry/format', {
    params: {
      attr: props.filter.attribute_ids,
      start: props.filter.date_from?.getTime(),
      end: props.filter.date_to?.getTime(),
      format: exportFormat.value,
    },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([req.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `exported_data.${exportFormat.value.toLowerCase()}`); //or any other extension
  document.body.appendChild(link);
  link.click();
}
</script>

<style scoped></style>
