<template>
  <q-form @submit="login" class="login-form">
    <q-input
      v-model="username"
      required
      name="username"
      autocomplete="username"
      label="Username"
      :rules="[(val) => (val && val.length > 0) || 'Username is required']"
    ></q-input>
    <q-input
      v-model="password"
      required
      name="password"
      autocomplete="password"
      lazyRules
      label="Password"
      type="password"
      :rules="[(val) => (val && val.length > 0) || 'Password is required']"
      :error="loginResponseError"
      :errorMessage="err_message"
    ></q-input>

    <div class="q-mt-lg row justify-between">
      <q-btn class="col-12" label="Log in" type="submit" color="primary"></q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { QForm } from 'quasar';
import auth, { LoginStatus } from '../../store/auth';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const err_message = ref<string | undefined>(undefined);

const loginResponseError = computed(() => {
  return err_message.value !== undefined;
});

async function login() {
  const response = await auth.login(username.value, password.value);

  if (response.error) {
    const messages = {
      credentials: 'Wrong credentials',
      server: 'Server error',
    };

    err_message.value = messages[response.error];

    return;
  }

  const redir = router.currentRoute.value.query['redirect'];
  if (redir && redir.toString() != 'Login') {
    router.push({ name: redir.toString() });
  } else {
    router.push({ name: 'DeviceList' });
  }
}
</script>

<style scoped>
.login-form {
  min-width: 375px;
}
</style>
