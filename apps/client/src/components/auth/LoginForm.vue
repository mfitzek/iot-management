<template>
  <q-form @submit="login" class="login-form">
    <q-input
      v-model="email"
      required
      name="email"
      autocomplete="email"
      label="Email"
      :rules="[(val) => (val && val.length > 0) || 'Email is required']"
    ></q-input>
    <q-input
      v-model="password"
      required
      name="password"
      autocomplete="password"
      lazyRules
      label="Password"
      type="password"
      :rules="[
        (val) => (val && val.length > 0) || 'Password is required',
        verify,
      ]"
    ></q-input>

    <div class="q-mt-lg row justify-between">
      <q-btn
        class="col-12"
        label="Log in"
        type="submit"
        color="primary"
      ></q-btn>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    let first = true;
    let verified = false;
    function verify() {
      if (first) return true;
      return verified || 'Wrong email or password';
    }
    async function login() {
      // verified = await auth_store.login(email.value, password.value);
      verified = true;
      first = false;
      if (verified) {
        const redir = router.currentRoute.value.query['redirect'];
        if (redir && redir.toString() != 'Login') {
          router.push({ name: redir.toString() });
        } else {
          router.push({ name: 'DeviceDetail' });
        }
      }
    }
    return { email, password, login, verify };
  },
});
</script>

<style scoped>
.login-form {
  min-width: 375px;
}
</style>
