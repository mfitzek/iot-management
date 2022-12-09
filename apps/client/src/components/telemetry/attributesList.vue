<template>
  <div>
    <q-input label="Search" outlined class="q-py-md" type="search" v-model="search">
      <template v-slot:append>
        <q-icon name="search" search />
      </template>
    </q-input>
    <q-scroll-area style="height: 80vh">
      <q-list bordered separator>
        <q-expansion-item
          class="text-weight-medium"
          v-for="dev in filterDevices"
          :label="dev.name"
          default-opened
        >
          <q-list separator>
            <q-item
              dense
              v-for="attr in filterDeviceAttributes(dev)"
              clickable
              @click="click_attr(attr.id!)"
              :active="is_active(attr.id!)"
              class="text-weight-regular"
            >
              <q-item-section side>
                <q-checkbox left-label :model-value="is_active(attr.id!)" />
              </q-item-section>
              <q-item-section>{{ attr.name }}</q-item-section>
              <q-item-section side>{{ attr.type }}</q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { IDeviceData } from '@iot/device';
import { computed, reactive, ref } from 'vue';
import http from '@iot/services/http';

const emit = defineEmits<{
  (e: 'update', selected: string[]): void;
}>();

const search = ref('');

const devices = ref<IDeviceData[]>([]);

const filterDevices = computed(() => {
  const find = search.value.trim();
  return devices.value.filter((dev) => {
    if (find.length === 0) {
      return true;
    }

    if (dev.name.includes(find)) {
      return true;
    }
    return dev.attributes.some((attr) => attr.name.includes(find));
  });
});

function filterDeviceAttributes(device: IDeviceData) {
  const find = search.value.trim();
  return device.attributes.filter((attr) => {
    if (find.length === 0) {
      return true;
    }

    if (attr.name.includes(find)) {
      return true;
    }

    if (device.name.includes(find)) {
      return true;
    }
  });
}

async function getRows() {
  const req = await http.get('device/list');
  devices.value.push(...req.data);
}

getRows();

const selected = reactive(new Set<string>());

function click_attr(id: string) {
  if (selected.has(id)) {
    selected.delete(id);
  } else {
    selected.add(id);
  }

  emit('update', [...selected]);
}

function is_active(id: string) {
  return selected.has(id);
}
</script>

<style scoped></style>
