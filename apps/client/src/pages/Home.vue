<script setup lang="ts">
import { useQuasar } from 'quasar';

const $q = useQuasar();

function notify() {
  $q.notify({
    message: 'Hello',
    color: 'positive',
    caption: 'Fakt nevim',
    position: 'bottom',
  });
}
</script>

<template>
  <q-btn color="primary" @click="notify">Hello</q-btn>
</template>
