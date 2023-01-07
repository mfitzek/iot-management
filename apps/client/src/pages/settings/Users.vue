<template>
  <q-table title="Users" :rows="userList" row-key="name" />
</template>

<script setup lang="ts">
const userList = [
  {
    username: 'JohnyB',
    email: 'john.doe@example.com',
    role: 'admin',
    devices: Math.round(Math.random() * 10),
    recods: Math.round(Math.random() * 1000),
  },
  {
    username: 'JimmyG',
    email: 'jim.doe@example.com',
    role: 'user',
    devices: Math.round(Math.random() * 10),
    recods: Math.round(Math.random() * 1000),
  },
  {
    username: 'JohnyC',
    email: 'john.doe@example.com',
    role: 'user',
    devices: Math.round(Math.random() * 10),
    records: Math.round(Math.random() * 1000),
  },
];
</script>

<style scoped></style>
