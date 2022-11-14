<template>
  <section>
    <span class="text-h4">MQTT connection</span>
    <q-toggle v-model="enabled" color="green" />
  </section>

  <section>
    <div class="row q-mt-sm q-gutter-x-sm">
      <div class="col">
        <q-input v-model="url" type="text" label="URL" required filled />
      </div>
      <div class="col">
        <q-input v-model="client" type="text" label="Client ID" filled />
      </div>
    </div>

    <div class="row q-mt-sm q-gutter-x-sm">
      <div class="col">
        <q-input v-model="username" type="text" label="Username" filled />
      </div>
      <div class="col">
        <q-input v-model="pass" type="password" label="Password" filled />
      </div>
    </div>
  </section>

  <section>
    <q-table :rows="data" :columns="columns" row-key="name">
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

  <MqttMapDialog
    :show="showDialog"
    @close="showDialog = false"
    @add="addTopic"
  ></MqttMapDialog>
</template>

<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { ref } from 'vue';
import MqttMapDialog from './mqttMapDialog.vue';

const enabled = ref(false);

const url = ref('');
const client = ref('');
const username = ref('');
const pass = ref('');

const showDialog = ref(false);

const columns: QTableColumn[] = [
  { name: 'attribute', label: 'Attribute', field: 'attribute', align: 'left' },
  { name: 'topic', label: 'Topic', field: 'topic', align: 'left' },
];

const data = ref([
  { attribute: 'teplota', topic: '/roomX/thermometer/temp' },
  { attribute: 'vlhkost', topic: '/roomX/thermometer/hum' },
]);

function addTopic(mapping) {
  data.value.push({
    attribute: mapping.attribute.name,
    topic: mapping.topic,
  });
}
</script>

<style scoped></style>
