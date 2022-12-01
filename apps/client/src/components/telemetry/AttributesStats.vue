<template>
  <div>
    <div class="row q-mt-sm q-col-gutter-md" v-for="dev of $props.data">
      <div class="col">
        Device: {{ dev?.name }}
        <div class="row q-mb-sm">
          <div class="col">Attribute</div>
          <div class="col">Type</div>
          <div class="col">Collected</div>
          <div class="col">Last date</div>
          <div class="col">Last value</div>
        </div>
        <hr />
        <div class="row" v-for="a of dev?.attributes">
          <div class="col">{{ a.name }}</div>
          <div class="col">{{ a.type }}</div>
          <div class="col">{{ a.telemetry?.length }}</div>
          <div class="col">{{ getLastData(a)?.createdAt ?? 'NA' }}</div>
          <div class="col">{{ getLastData(a)?.value ?? 'NA' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ITelemetryAttribute, ITelemetryDevice } from '@iot/telemetry';

const props = defineProps<{
  data: ITelemetryDevice[];
}>();

function getLastData(attribute: ITelemetryAttribute) {
  return attribute.telemetry[attribute.telemetry.length - 1];
}
</script>

<style scoped></style>
