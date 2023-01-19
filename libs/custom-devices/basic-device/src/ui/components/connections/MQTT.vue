<template>
  <div class="q-gutter-md">
    <section>
      <div class="row justify-between">
        <div class="col">
          <span class="text-h4">MQTT connection</span>
          <q-toggle v-model="settings.active" color="green" />
        </div>
        <div class="col-auto">
          <q-btn color="green" label="Update settings" @click="updateSettings()" />
        </div>
      </div>
    </section>

    <section>
      <div class="row q-mt-sm q-gutter-x-sm">
        <div class="col">
          <q-input v-model="settings.url" type="text" label="URL" required filled />
        </div>
      </div>

      <div class="row q-mt-sm q-gutter-x-sm">
        <div class="col">
          <q-input v-model="settings.username" type="text" label="Username" filled />
        </div>
        <div class="col">
          <q-input v-model="settings.password" type="password" label="Password" filled />
        </div>
      </div>
    </section>

    <section>
      <q-table :rows="data" :columns="columns" row-key="name" flat @row-click="openEditDialog">
        <template #top>
          <div class="col text-h5">Mqtt attribute mapping</div>
          <q-btn color="primary" label="Add attribute" @click="openAddDialog" />
        </template>
      </q-table>
    </section>
  </div>

  <template v-if="showDialog">
    <MqttMapDialog
      :mapping="dialogMapping"
      @close="showDialog = false"
      @add="addTopic"
      @remove="removeTopic()"
    ></MqttMapDialog>
  </template>
</template>

<script setup lang="ts">
import { IMqttAttributeMap } from '../../../common/mqtt/IMqttSettings';
import { QTableColumn } from 'quasar';
import { computed, ref, watch } from 'vue';
import MqttMapDialog from './mqttMapDialog.vue';
import store, { getMqttSettings, updateKeyValues } from '../../store';
import { getAsKeyValue } from '../../../common/mqtt/mqtt';

const settings = ref(getMqttSettings());

const showDialog = ref(false);
const dialogMapping = ref<IMqttAttributeMap | undefined>(undefined);
let currentEditIndex: number | null = null;

const columns: QTableColumn[] = [
  { name: 'attribute', label: 'Attribute', field: 'attribute', align: 'left' },
  { name: 'topic', label: 'Topic', field: 'topic', align: 'left' },
];

const data = computed(() => {
  return settings.value.attribute_mapping.map((map) => {
    const attribute = store.device?.attributes.find((a) => a.id == map.attribute_id);
    return {
      id: attribute?.id,
      attribute: `${attribute?.name} (${attribute?.type})`,
      topic: map.topic,
    };
  });
});

function addTopic(mapping: IMqttAttributeMap) {
  if (currentEditIndex !== null) {
    settings.value.attribute_mapping[currentEditIndex] = mapping;
  } else {
    settings.value.attribute_mapping.push(mapping);
  }
  currentEditIndex = null;
  dialogMapping.value = undefined;
}

function removeTopic() {
  if (currentEditIndex !== null) {
    settings.value.attribute_mapping.splice(currentEditIndex, 1);
  }
  currentEditIndex = null;
  dialogMapping.value = undefined;
}

function setMqttData() {
  settings.value = getMqttSettings();
}

function updateSettings() {
  if (!store.device) return;
  const updatedKeyValue = getAsKeyValue(settings.value);
  updateKeyValues([updatedKeyValue]);
}

function openEditDialog({}, {}, index: number) {
  currentEditIndex = index;
  dialogMapping.value = settings.value.attribute_mapping[index];
  showDialog.value = true;
}

function openAddDialog() {
  dialogMapping.value = undefined;
  currentEditIndex = null;
  showDialog.value = true;
}

watch(
  () => store.device,
  () => {
    setMqttData();
  },
  { deep: true, immediate: true }
);
</script>

<style scoped></style>
