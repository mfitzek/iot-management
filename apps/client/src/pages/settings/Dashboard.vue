<template>
  <div>
    <h4>Overview</h4>
    <section class="q-mt-md">
      <p class="text-h5">Backup Database</p>
      <q-btn color="primary" icon="cloud_download" label="Backup" @click="backup" />
    </section>

    <section class="q-mt-md">
      <p class="text-h5">Restore Database</p>
      <div class="row items-center q-gutter-md">
        <div class="col-4">
          <q-file filled bottom-slots v-model="file" label="Label" counter accept=".zip">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" @click.stop />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click.stop="file = null" class="cursor-pointer" />
            </template>
          </q-file>
        </div>
        <div class="col-auto">
          <q-btn color="primary" icon="cloud_upload" label="Restore" @click="restore" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
