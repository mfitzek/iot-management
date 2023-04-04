<template>
  <q-dialog v-model="props.modelValue">
    <q-card class="dialog">
      <q-card-section>
        <q-select label="Device" v-model="selectedDevice" :options="deviceOptions" />
        <q-select label="Attribute" v-model="selectedAttribute" :options="attributeOptions" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="red" @click="closeDialog" flat />
        <q-btn label="Add" color="primary" @click="saveItem" :disable="!isValid" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from '@iot/services/http-axios';
import { DeviceData } from '@iot/device';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': (value: boolean) => void;
  addItem: () => void;
}>();
interface Attribute {
  label: string;
  value: string;
  attribute: { id: string; device: string; name: string };
}

const selectedDevice = ref(null);
const selectedAttribute = ref<Attribute | null>(null);
const deviceOptions = computed(() => devices.value.map((device) => device.name));
const attributeOptions = computed(() => {
  const attributes: Attribute[] = [];
  const filterDevices = selectedDevice.value
    ? devices.value.filter((device) => device.name === selectedDevice.value)
    : [];

  filterDevices.forEach((device) => {
    device.attributes.forEach((attribute) => {
      attributes.push({
        label: attribute.name,
        value: attribute.id,
        attribute: { id: attribute.id, device: device.name, name: attribute.name },
      });
    });
  });
  return attributes;
});

const devices = ref<DeviceData[]>([]);

const isValid = computed(() => selectedDevice.value && selectedAttribute.value);

function closeDialog() {
  emit('update:modelValue', false);
}

const saveItem = () => {
  if (selectedAttribute.value) {
    emit('addItem', selectedAttribute.value.attribute);
    closeDialog();
  }
};

async function fetchUserAttributes() {
  const response = await axios.get('/device/list');
  devices.value = response.data;
}

fetchUserAttributes();
</script>

<style scoped>
.dialog {
  width: 600px;
}
</style>
