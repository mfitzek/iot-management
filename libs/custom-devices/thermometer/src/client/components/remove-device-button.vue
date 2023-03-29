<template>
  <div>
    <div class="row justify-end q-mt-md q-gutter-sm">
      <q-btn color="red" icon="delete" @click="removeDevice()" round>
        <q-tooltip> Remove device </q-tooltip>
      </q-btn>
      <q-btn color="green" icon="file_copy" @click="void" round>
        <q-tooltip> Copy device </q-tooltip>
      </q-btn>
    </div>
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
