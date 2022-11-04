<template>
  <div class="q-gutter-md info_form">
    <q-input v-model="name" type="text" label="Device name" filled />
    <q-input v-model="type" readonly label="Device type" filled />

    <q-btn
      color="primary"
      icon-right="check"
      label="Save information"
      @click="saveInformation()"
    />

    <q-btn
      color="red"
      icon="remove"
      label="Remove device"
      @click="removeDevice()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import store, { updateCurrentDevice, removeCurrentDevice } from '../store';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref(store.device?.name ?? '');
const type = ref(store.device?.type);

async function saveInformation() {
  const device = store.device;
  if (device) {
    device.name = name.value;
    await updateCurrentDevice();
  }
}

async function removeDevice() {
  await removeCurrentDevice();
  router.push({ name: 'DeviceList' });
}
</script>

<style scoped lang="scss">
.info_form {
  max-width: 400px;
}
</style>
