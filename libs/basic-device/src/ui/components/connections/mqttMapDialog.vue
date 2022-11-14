<template>
  <q-dialog :model-value="show" full-width @hide="close()">
    <q-card>
      <q-card-section>
        <div class="text-h6">Attributes mapping</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-col-gutter-md items-end">
          <div class="col">
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
          </div>

          <div class="col">
            <q-input
              v-model="topic"
              label="Topic"
              filled
              placeholder="eg. /building1/room2/temp"
            ></q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="close" />
        <q-btn label="Add mapping" color="primary" @click="add_topic" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import store from '../../store';

const props = defineProps({
  show: Boolean,
});
const emits = defineEmits(['close', 'add']);

const attribute = ref(null);
const options = store.device?.attributes;

const topic = ref('');

function close() {
  emits('close');
}

function add_topic() {
  emits('add', {
    attribute: attribute.value,
    topic: topic.value,
  });
  close();
}
</script>

<style scoped></style>
