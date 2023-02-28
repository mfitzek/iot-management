<template>
  <div class="q-pa-md text-center">
    <h1>Fakt nevim uz</h1>
    <div v-if="auth.is_authenticated() == false">
      <h3>IoT Data Storage</h3>
      <p class="text-h5">To continue, please log in or sing up</p>
      <div class="row q-gutter-md justify-center">
        <q-btn
          color="primary"
          label="Log in"
          :to="{ name: 'Login' }"
          class="col-6 col-md-4 col-lg-2"
        />
        <q-btn
          color="primary"
          label="Sing up"
          :to="{ name: 'SignUp' }"
          class="col-6 col-md-4 col-lg-2"
        />
      </div>
    </div>
    <div v-else>
      <h3>IoT Data Storage</h3>
      <p class="text-h5">Welcome {{ username() }}</p>
      <div class="row q-gutter-md justify-center">
        <q-btn
          color="primary"
          label="Device list"
          :to="{ name: 'DeviceList' }"
          class="col-6 col-md-4 col-lg-2"
        />
        <q-btn
          color="primary"
          label="Storaged Data"
          :to="{ name: 'Telemetry' }"
          class="col-6 col-md-4 col-lg-2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import auth from '../store/auth';

function username() {
  return auth.state.value?.user.username;
}
</script>
