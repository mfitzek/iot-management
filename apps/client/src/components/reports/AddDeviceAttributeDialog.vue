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

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': (value: boolean) => void;
  addItem: () => void;
}>();

const selectedDevice = ref(null);
const selectedAttribute = ref(null);
const deviceOptions = ref(['Device 1', 'Device 2', 'Device 3']);
const attributeOptions = ref(['Attribute 1', 'Attribute 2', 'Attribute 3']);

const isValid = computed(() => selectedDevice.value && selectedAttribute.value);

function closeDialog() {
  emit('update:modelValue', false);
}

const saveItem = () => {
  const newItem = {
    id: Date.now().toString(),
    device: selectedDevice.value,
    attribute: selectedAttribute.value,
  };
  emit('addItem');
  closeDialog();
};
</script>

<style scoped>
.dialog {
  width: 600px;
}
</style>
