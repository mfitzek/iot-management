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
      :rules="[
        (val) => (val && val.length > 0) || 'Password is required',
        verify
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

import auth from '../../store/auth';

import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();
    const verified = ref<boolean | null>(null);

    const verify = () => {
      if(verified.value === false)
        return 'Wrong username or password';
      return true;
    };

    async function login() {
      verified.value = await auth.login(username.value, password.value);
      if (verified) {
        const redir = router.currentRoute.value.query['redirect'];
        if (redir && redir.toString() != 'Login') {
          router.push({ name: redir.toString() });
        } else {
          router.push({ name: 'DeviceList' });
        }
      }
    }
    return { username, password, login, verify };
  },
});
</script>

<style scoped>
.login-form {
  min-width: 375px;
}
</style>
