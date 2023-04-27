<template>
  <section>
    <span class="text-h4">HTTP connection</span>
  </section>

  <section class="row q-gutter-md">
    <q-toggle
      :model-value="deviceStore.httpGatewaySettings.active"
      color="green"
      @click="toggleHttp()"
      label="Allow HTTP Communication"
      left-label
    />
  </section>

  <section class="row q-gutter-md items-end">
    <div class="col-4">
      <q-input
        v-model="deviceStore.httpGatewaySettings.accessToken"
        type="text"
        label="Access Token"
        readonly
        filled
      >
        <template #append>
          <q-btn round dense flat icon="content_copy" @click="clipboard_copy" />
        </template>
      </q-input>
    </div>
    <div class="col">
      <q-btn color="primary" icon="s_refresh" label="Refresh token" @click="refresh"> </q-btn>
    </div>
  </section>
  <section>
    <p>
      Usage: <br />
      send <span class="text-bold">POST</span> request to <br />
      <span class="text-italic">api-server/api/gateway/{{ deviceStore.device?.id }}</span> <br />
      with header<br />
      <code>Authorization: {{ deviceStore.httpGatewaySettings.accessToken }}</code> <br />
      with body as JSON format: <br />
      <code> { "attribute_name": value, "temperature": 24.2 } </code>
    </p>
  </section>
</template>

<script setup lang="ts">
import axios from '@iot/services/http-axios';
import { useBasicDeviceStore } from '../../store-pinia';

const deviceStore = useBasicDeviceStore();

async function toggleHttp() {
  if (!deviceStore.device) return;
  await axios.post(
    `devices/${deviceStore.device.id}/custom`,
    {
      active: !deviceStore.httpGatewaySettings.active,
    },
    {
      params: {
        path: 'set-http-active',
      },
    }
  );
  deviceStore.fetchDevice(deviceStore.device.id);
}

async function refresh() {
  if (deviceStore.device) {
    const res = await axios.post(
      `devices/${deviceStore.device.id}/custom`,
      {},
      {
        params: {
          path: 'refresh-http-token',
        },
      }
    );
    deviceStore.device = res.data;
  }
}

function clipboard_copy() {
  if (deviceStore.httpGatewaySettings.accessToken.length) {
    navigator.clipboard.writeText(deviceStore.httpGatewaySettings.accessToken);
  }
}
</script>

<style scoped></style>
