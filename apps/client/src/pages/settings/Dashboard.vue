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

<script setup lang="ts">
import { ref } from 'vue';
import api from '@iot/services/http';

const file = ref(null);

async function restore() {
  if (file.value) {
    let form = new FormData();
    form.append('backup', file.value);
    try {
      await api.post('/settings/restore', form);
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
  const res = await api.post('/settings/backup', null, {
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
</script>

<style scoped></style>
