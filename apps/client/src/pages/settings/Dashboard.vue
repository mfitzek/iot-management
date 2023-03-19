<template>
  <div>
    <section>
      <p class="text-h5">Statistics</p>
      <div>{{ stats?.cache.cacheWrites }} Cache Writes / Hour</div>
      <div>{{ stats?.cache.databaseWrites }} Database Writes / Hour</div>
      <div class="">{{ stats?.users }} Users</div>
      <div class="">{{ stats?.devices }} Devices</div>
      <div class="">{{ stats?.records }} Records</div>
    </section>

    <section>
      <div class="column">
        <p class="text-h5">Size of database</p>
        <DBState></DBState>
      </div>
    </section>

    <section class="q-mt-md">
      <p class="text-h5">Backup &amp; Restore Database</p>
      <div class="q-gutter-sm">
        <q-btn color="primary" icon="cloud_download" label="Backup" @click="backup" />
        <q-btn color="primary" icon="cloud_upload" label="Restore" @click="restoreDialog = true" />
      </div>
    </section>
  </div>

  <q-dialog v-model="restoreDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Upload backup file</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-file filled bottom-slots v-model="file" label="Backup file" counter accept=".zip">
          <template v-slot:prepend>
            <q-icon name="cloud_upload" @click.stop />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click.stop="file = null" class="cursor-pointer" />
          </template>
        </q-file>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Restore database" v-close-popup @click="restore()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@iot/services/http-axios';
import DBState from '../../components/settings/DBState.vue';
import { Statistics } from '@iot/administration';
import { useQuasar } from 'quasar';

const file = ref(null);
const stats = ref<Statistics | null>(null);
const restoreDialog = ref(false);
const { notify } = useQuasar();

async function getStats() {
  const res = await api.get<Statistics>('/administration/statistics');
  stats.value = res.data;
}

async function restore() {
  if (file.value) {
    let form = new FormData();
    form.append('file', file.value);
    try {
      await api.post('/backup', form);
      notify({
        message: 'Database has been restored',
        icon: 'notification',
        color: 'positive',
      });
    } catch (error) {
      notify({
        message: 'Error occurred while restoring database',
        icon: 'warning',
        color: 'negative',
      });
    }
  }
}
async function backup() {
  const res = await api.get('/backup', {
    responseType: 'blob',
  });
  const filename = res.headers['content-disposition'].split('=')[1];
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

getStats();
</script>

<style scoped></style>
