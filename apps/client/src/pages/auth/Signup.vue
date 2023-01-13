<template>
  <q-page padding class="row justify-center">
    <div class="col-auto">
      <q-card>
        <q-card-section>
          <div class="text-h4 text-center">Sign up</div>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-section>
          <signup-form></signup-form>
        </q-card-section>
        <q-card-section class="text-center">
          Already have account?
          <router-link :to="{ name: 'Login' }">Login</router-link>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignupForm from '@components/auth/SignupForm.vue';
export default defineComponent({
  components: { SignupForm },
  setup() {},
});
</script>

<style scoped></style>
