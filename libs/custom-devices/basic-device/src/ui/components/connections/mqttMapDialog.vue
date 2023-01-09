<template>
  <q-dialog v-model="show" @hide="close()">
    <q-card class="mqtt-dialog">
      <q-card-section>
        <div class="text-h6">Attributes mapping</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-select
          v-model="attribute"
          :options="options"
          label="Attribute"
          filled
          :display-value="`${attribute?.name ?? ''}`"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>({{ scope.opt.type }})</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input
          v-model="topic"
          label="Topic"
          filled
          placeholder="eg. /building1/room2/temp"
        ></q-input>
      </q-card-section>
      <q-card-actions align="right" v-if="mapping">
        <q-btn flat label="Delete" color="red" @click="removeTopic" />
        <q-btn flat label="Cancel" color="primary" @click="close" />
        <q-btn label="Update" color="primary" @click="add_topic" />
      </q-card-actions>
      <q-card-actions align="right" v-else>
        <q-btn flat label="Cancel" color="primary" @click="close" />
        <q-btn label="Add mapping" color="primary" @click="add_topic" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { IAttribute } from '@iot/device';
import { IMqttAttributeMap } from 'libs/basic-device/src/common/mqtt/IMqttSettings';
import { emit } from 'process';
import { ref } from 'vue';
import store from '../../store';

const show = true;

const props = defineProps<{ mapping?: IMqttAttributeMap }>();
const emits = defineEmits(['close', 'add', 'remove']);

const attribute = ref<IAttribute | null>(null);
const options = store.device?.attributes;

const topic = ref('');

function close() {
  emits('close');
}

function add_topic() {
  if (attribute.value && topic.value.length > 0) {
    const mapping: IMqttAttributeMap = {
      attribute_id: attribute.value.id ?? '',
      topic: topic.value,
    };

    emits('add', mapping);
    close();
  }
}

function removeTopic() {
  emits('remove');
  close();
}

function initValues() {
  if (props.mapping) {
    attribute.value =
      store.device?.attributes.find((attr) => attr.id === props.mapping?.attribute_id) ?? null;
    topic.value = props.mapping.topic;
  }
}

initValues();
</script>

<style scoped>
.mqtt-dialog {
  min-width: 500px;
}
</style>
