<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import auth from './store/auth';

auth.loadAuthStoreFromLocalStorage();
</script>
