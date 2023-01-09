<template>
  <div class="q-gutter-md info_form">
    <q-input v-model="name" type="text" label="Device name" filled />
    <q-input v-model="type" readonly label="Device type" filled />

    <q-btn color="primary" icon-right="check" label="Save information" @click="saveInformation()" />

    <q-btn color="red" icon="remove" label="Remove device" @click="removeDevice()" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import store, { updateCurrentDevice, removeCurrentDevice } from '../store';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();

const name = ref(store.device?.name ?? '');
const type = ref(store.device?.type);

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
</script>

<style scoped>
.info_form {
  max-width: 400px;
}
</style>
