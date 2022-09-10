<template>
  <q-page padding class="row justify-center">
    <div class="col-auto">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">Login</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <login-form></login-form>
        </q-card-section>
        <q-card-section class="text-center">
          Not a member yet?
          <router-link :to="{ name: 'SignUp' }">Signup</router-link>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@components/auth/LoginForm.vue';
export default defineComponent({
  components: {
    LoginForm,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
