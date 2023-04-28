<template>
  <div class="q-px-md">
    <q-card class="q-ma-lg device-card q-mx-auto">
      <q-card-section horizontal>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h5"> {{ name }} </q-item-label>
            <q-item-label caption> Termostatická hlavice </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-h6">Teplota: {{ teplota }} °C</div>
        <div class="text-h6">Otevření ventilu: {{ ventil }} %</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from '@iot/services/http-axios';
import { DeviceData } from '@iot/device';

const name = ref('Název zařízení');
const teplota = ref(0);
const ventil = ref(0);

const props = defineProps({
  id: { type: String, required: true },
});

async function fetchData() {
  const resp = await axios.get<DeviceData>(`/devices/${props.id}`);
  name.value = resp.data.name;
  const state = resp.data.state;
  if (state && 'teplota' in state && 'otevreniVentilu' in state) {
      teplota.value = Number(state['teplota']);
      ventil.value = Number(state['otevreniVentilu']);
  }
}
fetchData();
</script>

<style scoped></style>
