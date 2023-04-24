<template>
  <q-table title="Users" :rows="userList" row-key="name" />
</template>

<script setup lang="ts">
import { UserStats } from '@iot/administration';
import axios from '@iot/services/http-axios';
import { ref } from 'vue';

const userList = ref<UserStats[]>([]);

async function fetchUsers() {
  const users = await axios.get<UserStats[]>('/administration/users');

  userList.value = users.data;
}

const test = [
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

fetchUsers();
</script>

<style scoped></style>
