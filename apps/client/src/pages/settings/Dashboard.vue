<template>
  <div>
    <section></section>

    <section>
      <div class="column">
        <p class="text-h5">Size of database</p>
        <DBState></DBState>
        <div class="">{{ stats?.users }} Users</div>
        <div class="">{{ stats?.devices }} Devices</div>
        <div class="">{{ stats?.records }} Records</div>
      </div>
    </section>

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

<script setup lang="ts">
import { ref } from 'vue';
import api from '@iot/services/http';
import DBState from '../../components/settings/DBState.vue';
import { Statistics } from '@iot/administration';

const file = ref(null);
const stats = ref<Statistics | null>(null);

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
      // this.$store.dispatch("user_settings/fetch");
      // this.$store.commit("app/Push", { message: "Databáze úspěšně obnovena", type: "success" });
    } catch (error) {
      // this.$store.commit("app/Push", {
      //     message: "Chyba při obnovování dat.",
      //     type: "error",
      // });
      console.log(error);
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
