<template>
  <section>
    <span class="text-h4">HTTP connection</span>
    <q-toggle v-model="enabled" color="green" />
  </section>

  <section class="row q-gutter-md items-end">
    <div class="col-4">
      <q-input v-model="token" type="text" label="Access Token" readonly filled>
        <template #append>
          <q-btn round dense flat icon="content_copy" @click="clipboard_copy" />
        </template>
      </q-input>
    </div>
    <div class="col">
      <q-btn
        color="primary"
        icon="s_refresh"
        label="Refresh token"
        @click="refresh"
      >
      </q-btn>
    </div>
  </section>
  <section>
    <p>
      To send data via HTTP send POST request to <br />
      POST localhost:3000/telemetry/SOMEID <br />
      set header <br />
      "access_token"={{ token }} <br />
      and body with name of parameters eg.<br />
      temp=24.6&hum=45.5 <br />
      or send attributes in JSON format <br />
      <code> { "temp": 24.6, "hum": 33.4 } </code>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const enabled = ref(false);
const token = ref('axasda=axsdsadsad/asdsad4@#');

async function refresh() {
  // todo: referesh
}

function clipboard_copy() {
  if (token.value.length) {
    navigator.clipboard.writeText(token.value);
  }
}
</script>

<style scoped></style>
