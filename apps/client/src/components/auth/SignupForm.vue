<template>
  <q-form @submit="signup" ref="myForm" class="signup-form">
    <q-input
      v-model="username"
      name="username"
      autocomplete="username"
      label="Username"
      :rules="usernameRules"
      @update:model-value="usernameExists = false"
    ></q-input>
    <q-input
      v-model="email"
      name="email"
      label="Email"
      type="email"
      autocomplete="email"
      :rules="emailRules"
      @update:model-value="emailExists = false"
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
      <q-btn class="col-12" label="Sign up" type="submit" color="primary"></q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import http from '@iot/services/http-axios';
import { IRegisterPost, IRegisterResponse } from '@iot/user';
import { QForm } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const myForm = ref<QForm | null>(null);

const username = ref('');
const email = ref('');
const password_confirm = ref('');
const password = ref('');

const usernameExists = ref(false);
const emailExists = ref(false);

const router = useRouter();

function password_confirmation() {
  return !password.value || password.value == password_confirm.value || 'Passwords must match';
}

const usernameRules = [
  (value: string) => (value && value.length > 0) || 'Username is required',
  () => (usernameExists.value ? 'Username already exists' : true),
];
const emailRules = [
  (value: string) => (value && value.length > 0) || 'Email is required',
  () => (emailExists.value ? 'Email already exists' : true),
];

async function signup() {
  usernameExists.value = false;
  emailExists.value = false;

  const registerData: IRegisterPost = {
    email: email.value,
    username: username.value,
    password: password.value,
  };
  const response = await http.post<IRegisterResponse>('auth/register', registerData);

  if (response.data.success) {
    router.push({ name: 'Login' });
  }

  emailExists.value = response.data.errors?.emailExists ?? false;
  usernameExists.value = response.data.errors?.usernameExists ?? false;

  await myForm.value?.validate();

  return false;
}
</script>

<style scoped>
.signup-form {
  min-width: 375px;
}
</style>
