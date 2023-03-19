<template>
  <div class="log-component">
    <h2>Logs</h2>
    <ul>
      <li>
        <span class="log-level">INFO</span>
        <span class="log-message">Application started</span>
        <span class="log-time">2023-03-18 10:00:00</span>
      </li>
      <li>
        <span class="log-level">WARNING</span>
        <span class="log-message">Some files could not be loaded</span>
        <span class="log-time">2023-03-18 10:01:30</span>
      </li>
      <li>
        <span class="log-level">ERROR</span>
        <span class="log-message">Database connection failed</span>
        <span class="log-time">2023-03-18 10:03:45</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

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
