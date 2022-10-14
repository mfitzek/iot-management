<template>
  <div>
    <q-card class="q-ma-lg">
      <q-card-section>
        <h3>Basic device</h3>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Velit impedit
        alias, expedita obcaecati perferendis reiciendis porro itaque error eos
        et nam, soluta quo necessitatibus dolorum rem facere exercitationem
        debitis asperiores. Laudantium inventore asperiores cum voluptas
        reprehenderit qui eius dolore consectetur earum. Quod iste quis eligendi
        blanditiis provident deserunt, quae similique!
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { fetchDevice } from './store';

const props = defineProps({
  id: { type: String, required: true },
});

// init store
fetchDevice(props.id);
</script>

<style scoped></style>
