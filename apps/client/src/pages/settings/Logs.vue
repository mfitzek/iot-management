<template>
  <div class="log-component">
    <h2>Logs</h2>

    <q-scroll-area style="height: 600px">
      <ul>
        <li v-for="log of logs">
          <span class="log-level">{{ log.type }}</span>
          <span class="log-time">{{ new Date(log.timestamp).toISOString() }}</span>
          <span class="log-message">{{ log.message }}</span>
        </li>
      </ul>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { Log } from '@iot/logger';
import axios from '@iot/services/http-axios';
import { ref } from 'vue';

const logs = ref<Log[]>([]);

async function getLogs() {
  const resp = await axios.get<Log[]>('/administration/logs');
  logs.value = resp.data.sort((a, b) => b.timestamp - a.timestamp);
}
getLogs();
</script>

<style scoped>
.log-component {
  border: 1px solid #ccc;
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
}

.log-component h2 {
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
}

.log-component ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.log-component li {
  margin-bottom: 10px;
}

.log-component .log-level {
  display: inline-block;
  padding: 2px 5px;
  border-radius: 5px;
  font-weight: bold;
}

.log-component .log-level.INFO {
  background-color: #8bc34a;
  color: #fff;
}

.log-component .log-level.WARNING {
  background-color: #ffc107;
  color: #333;
}

.log-component .log-level.ERROR {
  background-color: #f44336;
  color: #fff;
}

.log-component .log-message {
  margin-left: 10px;
}

.log-component .log-time {
  margin-left: 10px;
  color: #999;
}
</style>
