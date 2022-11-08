<template>
  <div class="row">
    <div class="col-3">Attributes List</div>

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

const currentTab = ref('overview');
</script>

<style scoped></style>
