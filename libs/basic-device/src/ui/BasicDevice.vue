<template>
  <div>
    <q-card class="q-ma-lg">
      <q-card-section>
        <q-tabs v-model="tab" dense>
          <q-tab name="info" icon="info" label="Information" />
          <q-tab name="attributes" icon="s_category" label="Attributes" />
          <q-tab
            name="connection"
            icon="s_settings_input_antenna"
            label="Connection"
          />
        </q-tabs>
      </q-card-section>
      <q-card-section>
        <!-- <DeviceInformation></DeviceInformation> -->
        <component :is="currentView"> </component>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { fetchDevice } from './store';
import DeviceInformation from './components/DeviceInformation.vue';
import AttributesView from './views/Attributes.vue';
import ConnectionView from './views/Connection.vue';
import store from './store';
import { computed, ref } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
});

const views: { [key: string]: any } = {
  info: DeviceInformation,
  attributes: AttributesView,
  connection: ConnectionView,
};

const tab = ref('info');

const currentView = computed(() => {
  const currentTab = tab.value;
  return views[currentTab] || null;
});

// init store
await fetchDevice(props.id);
</script>

<style scoped></style>
