<template>
  <div class="row">
    <div class="col-3">
      <AttributesList @update="updateAttributes"></AttributesList>
    </div>
    <div class="col-9">
      <q-tabs v-model="currentTab" class="text-primary">
        <q-tab name="overview" icon="s_view_list" label="Overview" />
        <q-tab name="graphs" icon="s_bar_chart" label="Visualization" />
        <q-tab name="export" icon="s_file_download" label="Export" />
      </q-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AttributesList from '../../components/telemetry/attributesList.vue';

const currentTab = ref('overview');

const selectedAttributes = ref<string[]>([]);

function updateAttributes(ids: string[]) {
  selectedAttributes.value = ids;
}
</script>

<style scoped></style>
