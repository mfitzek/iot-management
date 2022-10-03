<template>
  <q-form @submit="login" class="login-form">
    <q-input
      v-model="username"
      @change="dataChanged"
      required
      name="username"
      autocomplete="username"
      label="Username"
      :rules="[(val) => (val && val.length > 0) || 'Username is required']"
    ></q-input>
    <q-input
      v-model="password"
      @change="dataChanged"
      required
      name="password"
      autocomplete="password"
      lazyRules
      label="Password"
      type="password"
      :rules="[(val) => (val && val.length > 0) || 'Password is required']"
      :error="verify"
      :errorMessage="err_message"
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
import { defineComponent, ref, computed } from 'vue';

import { QForm } from 'quasar';

import auth from '../../store/auth';

import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const verified = ref<Boolean | null>(null);

    const dataChanged = () => {
      verified.value = null;
    };

    const verify = computed(() => {
      return verified.value === false;
    });

    const err_message = computed(() =>
      verified.value === false ? 'Wrong username or wrong password' : undefined
    );

    async function login() {
      if (verified.value === false) return;
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
    return { username, password, login, verify, dataChanged, err_message };
  },
});
</script>

<style scoped>
.login-form {
  min-width: 375px;
}
</style>
