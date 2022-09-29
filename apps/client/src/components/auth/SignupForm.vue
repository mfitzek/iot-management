<template>
  <q-form @submit="signup" ref="myForm" class="signup-form">
    <q-input
      v-model="username"
      name="username"
      autocomplete="username"
      label="Username"
      :rules="[(val) => (val && val.length > 0) || 'Username is required']"
      :error-message="existing_username"
      :error="existing_username != undefined"
    ></q-input>
    <q-input
      v-model="email"
      name="email"
      label="Email"
      type="email"
      autocomplete="email"
      :rules="[(val) => (val && val.length > 0) || 'Email is required']"
      :error-message="existing_email"
      :error="existing_email != undefined"
    ></q-input>
    <q-input
      v-model="password"
      name="new-password"
      label="Password"
      autocomplete="new-password"
      type="password"
      :rules="[(val) => (val && val.length > 0) || 'Password is required']"
    ></q-input>

    <q-input
      v-model="password_confirm"
      name="confirm-password"
      autocomplete="new-password"
      label="Confirm password"
      type="password"
      :rules="[password_confirmation]"
    ></q-input>

    <div class="q-mt-lg row justify-between">
      <q-btn
        class="col-12"
        label="Sign up"
        type="submit"
        color="primary"
      ></q-btn>
    </div>
  </q-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from 'vue';
import { QForm } from 'quasar';
import http from '@iot/services/http';
import { IRegisterPost } from '@iot/user';

export default defineComponent({
  emits: ['signUp'],

  setup(_, ctx) {
    const myForm = ref<QForm | null>(null);

    const username = ref('');
    const email = ref('');
    const password_confirm = ref('');
    const password = ref('');

    let first = true;

    let errors = reactive<{ email?: string; username?: string }>({});

    let existing_email = computed(() => {
      return errors.email;
    });

    let existing_username = computed(() => {
      return errors.username;
    });

    watch(email, (newEmail) => {
      errors.email = undefined;
    });

    watch(username, (newUsername) => {
      errors.username = undefined;
    });

    function password_confirmation() {
      return (
        !password.value ||
        password.value == password_confirm.value ||
        'Passwords must match'
      );
    }

    async function signup() {
      first = false;
      let valid = false;
      if (myForm.value) {
        valid = await myForm.value.validate();
      }

      if (valid) {
        const requestData: IRegisterPost = {
          email: email.value,
          username: username.value,
          password: password.value,
        };
        const req = await http.post('auth/register', requestData);

        if (req.data.username) {
          ctx.emit('signUp', req.data);
        } else {
          parseRegisterErrors(req.data.errors);
        }
      }
    }

    function parseRegisterErrors(data: string[]) {
      for (const err of data) {
        if (err.includes('Username')) {
          errors.username = err;
        }
        if (err.includes('Email')) {
          errors.email = err;
        }
      }
    }

    return {
      myForm,
      username,
      password,
      email,
      password_confirm,
      existing_email,
      existing_username,
      signup,
      password_confirmation,
    };
  },
});
</script>

<style scoped>
.signup-form {
  min-width: 375px;
}
</style>
