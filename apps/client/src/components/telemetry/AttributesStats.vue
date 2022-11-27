<template>
  <div>
    <div
      class="row q-mt-sm q-col-gutter-md"
      v-for="dev of mergedDevicesWithTelemetry"
    >
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
import { IDeviceData } from '@iot/device';
import http from '@iot/services/http';
import { IAttributeTelemetry } from '@iot/telemetry';
import { computed, ref } from 'vue';

const props = defineProps<{
  data: IAttributeTelemetry[];
}>();

const deviceList = ref<IDeviceData[]>([]);

const mergedDevicesWithTelemetry = computed(() => {
  return deviceList.value
    .map((dev) => {
      const attributes = props.data.filter((attrData) =>
        dev.attributes.find((attr) => attrData.id === attr.id)
      );
      if (attributes.length === 0) {
        return null;
      }
      return {
        ...dev,
        attributes,
      };
    })
    .filter((dev) => dev != null);
});

function getLastData(attribute: IAttributeTelemetry) {
  return attribute.telemetry[attribute.telemetry.length - 1];
}

async function fetchUserDevices() {
  const data = (await http.get<IDeviceData[]>('device/list')).data;
  deviceList.value = data;
}

fetchUserDevices();
</script>

<style scoped></style>
