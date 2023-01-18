<template>
  <div class="q-gutter-md row">
    <q-input v-model="name" type="text" label="Device name" filled class="col-lg-4 col-md-6 col" />
    <q-btn color="primary" icon-right="check" @click="saveInformation()">
      <q-tooltip> Update device information </q-tooltip>
    </q-btn>
  </div>

  <div row class="device-info">
    <div>Attributes: {{ store.device?.attributes.length }}</div>
    <div>Status:</div>
    <div>Last data:</div>
    <div>HTTP <q-badge rounded :color="connectionStateColor(http)"></q-badge></div>
    <div>MQTT <q-badge rounded :color="connectionStateColor(mqtt)"></q-badge></div>
  </div>
  <div class="row justify-end q-mt-md">
    <q-btn color="red" icon="delete" @click="removeDevice()" round>
      <q-tooltip> Remove device </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getHttpSettings } from '../../common/http/HttpSettings';
import { getDeviceMqttSettings } from '../../common/mqtt/mqtt';
import store, { removeCurrentDevice, updateCurrentDevice } from '../store';

const router = useRouter();
const $q = useQuasar();

const name = ref(store.device?.name ?? '');

async function saveInformation() {
  const device = store.device;
  if (device) {
    device.name = name.value;
    device.keyValues = [{ key: 'test', value: 'done' }];
    try {
      await updateCurrentDevice();
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
    await removeCurrentDevice();
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
  if (store.device) {
    const settings = getDeviceMqttSettings(store.device);
    return settings?.active ? true : false;
  }
  return false;
});
const http = computed(() => {
  if (store.device) {
    const settings = getHttpSettings(store.device);
    return settings?.active ? true : false;
  }
  return false;
});

function connectionStateColor(online: boolean) {
  return online ? 'green' : 'red';
}
function connectionState(online: boolean) {
  return online ? 'On' : 'Off';
}
</script>

<style scoped>
.device-info {
  font-family: 'Roboto Mono', monospace;
}
</style>
