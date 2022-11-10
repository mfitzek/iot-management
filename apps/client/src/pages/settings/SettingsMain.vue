<template>
  <div>
    <h2>Settings</h2>

    <section>
      <DBState></DBState>
    </section>

    <section>
      FILE
      <q-btn color="primary" icon="s_file_upload" label="Upload Backup" />
      <q-btn color="primary" icon="s_file_download" label="Create Backup" />
    </section>
  </div>
</template>

<script setup lang="ts">
import DBState from '../../components/settings/DBState.vue';
</script>

<style scoped></style>
