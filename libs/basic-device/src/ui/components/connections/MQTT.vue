<template>
  <div class="q-gutter-md">
    <section>
      <div class="row justify-between">
        <div class="col">
          <span class="text-h4">MQTT connection</span>
          <q-toggle v-model="settings.active" color="green" />
        </div>
        <div class="col-auto">
          <q-btn
            color="green"
            label="Update settings"
            @click="updateSettings()"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="row q-mt-sm q-gutter-x-sm">
        <div class="col">
          <q-input
            v-model="settings.url"
            type="text"
            label="URL"
            required
            filled
          />
        </div>
        <!-- <div class="col">
          <q-input
            v-model="settings.client_id"
            type="text"
            label="Client ID"
            filled
          />
        </div> -->
      </div>

      <div class="row q-mt-sm q-gutter-x-sm">
        <div class="col">
          <q-input
            v-model="settings.username"
            type="text"
            label="Username"
            filled
          />
        </div>
        <div class="col">
          <q-input
            v-model="settings.password"
            type="password"
            label="Password"
            filled
          />
        </div>
      </div>
    </section>

    <section>
      <q-table :rows="data" :columns="columns" row-key="name" flat>
        <template #top>
          <div class="col text-h5">Mqtt attribute mapping</div>
          <q-btn
            color="primary"
            label="Add attribute"
            @click="showDialog = true"
          />
        </template>
      </q-table>
    </section>
  </div>

  <MqttMapDialog
    :show="showDialog"
    @close="showDialog = false"
    @add="addTopic"
  ></MqttMapDialog>
</template>

<script setup lang="ts">
import {
  IMqttAttributeMap,
  IMqttSettings,
} from 'libs/basic-device/src/common/mqtt/IMqttSettings';
import { QTableColumn } from 'quasar';
import { computed, ref, watch } from 'vue';
import MqttMapDialog from './mqttMapDialog.vue';
import store, {
  getMqttSettings,
  setMqttSettings,
  updateCurrentDevice,
} from '../../store';

const settings = ref(getMqttSettings());

const showDialog = ref(false);

const columns: QTableColumn[] = [
  { name: 'attribute', label: 'Attribute', field: 'attribute', align: 'left' },
  { name: 'topic', label: 'Topic', field: 'topic', align: 'left' },
];

const data = computed(() => {
  return settings.value.attribute_mapping.map((map) => {
    const attribute = store.device?.attributes.find(
      (a) => a.id == map.attribute_id
    );
    return {
      id: attribute?.id,
      attribute: `${attribute?.name} (${attribute?.type})`,
      topic: map.topic,
    };
  });
});

function addTopic(mapping: IMqttAttributeMap) {
  settings.value.attribute_mapping.push(mapping);
}

function setMqttData() {
  settings.value = getMqttSettings();
}

function updateSettings() {
  setMqttSettings(settings.value);
  updateCurrentDevice();
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
