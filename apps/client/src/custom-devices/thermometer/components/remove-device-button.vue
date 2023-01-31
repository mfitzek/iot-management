<template>
  <div>
    <q-btn color="red" icon="delete" rounded flat @click="removeDevice()">
      <q-tooltip> Remove device </q-tooltip>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import { useThermometerStore } from '../store';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const store = useThermometerStore();
const router = useRouter();
const { notify } = useQuasar();

async function removeDevice() {
  try {
    await store.removeDevice();
    router.push({ name: 'DeviceList' });
    notify({
      message: 'Device has been deleted',
      icon: 'announcement',
      color: 'positive',
    });
  } catch (error) {
    notify({
      message: 'Error occured while deleting device',
      icon: 'announcement',
      color: 'negative',
    });
  }
}
</script>

<style scoped></style>
