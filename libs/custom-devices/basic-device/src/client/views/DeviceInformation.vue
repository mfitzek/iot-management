<template>
  <div class="q-gutter-md row">
    <q-input v-model="name" type="text" label="Device name" filled class="col-lg-4 col-md-6 col" />
    <q-btn color="primary" icon-right="check" @click="saveInformation()">
      <q-tooltip> Update device information </q-tooltip>
    </q-btn>
  </div>

  <div row class="device-info">
    <div>Attributes: {{ deviceStore.device?.attributes.length }}</div>
    <div>Status:</div>
    <div>Last data: {{ lastData }}</div>
    <div>HTTP <q-badge rounded :color="connectionStateColor(http)"></q-badge></div>
    <div>MQTT <q-badge rounded :color="connectionStateColor(mqtt)"></q-badge></div>
  </div>
  <div class="row justify-end q-mt-md q-gutter-sm">
    <q-btn color="red" icon="delete" @click="removeDevice()" round>
      <q-tooltip> Remove device </q-tooltip>
    </q-btn>
    <q-btn color="green" icon="file_copy" @click="copyDevice()" round>
      <q-tooltip> Copy device </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { getDeviceMqttSettings, getHttpSettings } from '@iot/custom-devices/basic-device/common';
import { useQuasar } from 'quasar';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { copyDeviceDialog } from '@iot/common-client';
import { useBasicDeviceStore } from '../store-pinia';

const router = useRouter();
const $q = useQuasar();

const deviceStore = useBasicDeviceStore();

const lastData = computed(() => {
  if (
    deviceStore.device &&
    deviceStore.device.state &&
    deviceStore.device.state.lastData != undefined
  ) {
    return new Date(deviceStore.device.state.lastData).toLocaleString();
  }
  console.log(deviceStore.device);
  return 'No data';
});

const name = ref(deviceStore.device?.name ?? '');

async function copyDevice() {
  if (deviceStore.device?.id) {
    const deviceId = await copyDeviceDialog(deviceStore.device.id);
    if (deviceId) {
      router.push({ name: 'DeviceDetail', params: { id: deviceId } });
    }
  }
}

async function saveInformation() {
  const device = deviceStore.device;
  if (device) {
    device.name = name.value;
    try {
      await deviceStore.updateCurrentDevice();
      $q.notify({
        message: 'Information has been saved',
        icon: 'announcement',
        color: 'positive',
      });
    } catch (error) {
      $q.notify({
        message: 'Error occured while saving information',
        icon: 'announcement',
        color: 'negative',
      });
    }
  }
}

async function removeDevice() {
  try {
    await deviceStore.removeCurrentDevice();
    router.push({ name: 'DeviceList' });
    $q.notify({
      message: 'Device has been deleted',
      icon: 'announcement',
      color: 'positive',
    });
  } catch (error) {
    $q.notify({
      message: 'Error occured while deleting device',
      icon: 'announcement',
      color: 'negative',
    });
  }
}

const mqtt = computed(() => {
  if (deviceStore.device) {
    const settings = getDeviceMqttSettings(deviceStore.device);
    return settings?.active ? true : false;
  }
  return false;
});
const http = computed(() => {
  if (deviceStore.device) {
    const settings = getHttpSettings(deviceStore.device);
    return settings?.active ? true : false;
  }
  return false;
});

function connectionStateColor(online: boolean) {
  return online ? 'green' : 'red';
}

watchEffect(() => {
  name.value = deviceStore.device?.name ?? '';
});
</script>

<style scoped>
.device-info {
  font-family: 'Roboto Mono', monospace;
}
</style>
