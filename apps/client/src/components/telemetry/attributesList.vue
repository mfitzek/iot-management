<template>
  <div>
    <q-input
      label="Search"
      outlined
      class="q-py-md"
      type="search"
      v-model="search"
    >
      <template v-slot:append>
        <q-icon name="search" search />
      </template>
    </q-input>
    <q-scroll-area style="height: 80vh">
      <q-list bordered separator>
        <q-expansion-item
          v-for="dev in filtered_attributes"
          :label="dev.name"
          default-opened
        >
          <q-list>
            <q-item
              v-for="attr in dev.attributes"
              clickable
              @click="click_attr(attr.id!)"
              :active="is_active(attr.id!)"
            >
              <q-item-section>{{ attr.name }}</q-item-section>
              <q-item-section>{{ attr.type }}</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { IDeviceData } from '@iot/device';
import { reactive, ref } from 'vue';
import http from '@iot/services/http';

const search = ref('');

const filtered_attributes = ref<IDeviceData[]>([]);

async function getRows() {
  const req = await http.get('device/list');
  filtered_attributes.value.push(...req.data);
}

getRows();

const selected = reactive(new Set<string>());

function click_attr(id: string) {
  if (selected.has(id)) {
    selected.delete(id);
  } else {
    selected.add(id);
  }
}

function is_active(id: string) {
  return selected.has(id);
}
</script>

<style scoped></style>
