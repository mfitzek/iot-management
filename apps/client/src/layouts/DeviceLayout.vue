<template>
  <Suspense>
    <DeviceDetail :id="props.id" :key="props.id"></DeviceDetail>
    <template #fallback>
      <LoadingComponent></LoadingComponent>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import LoadingComponent from '../pages/device/LoadingComponent.vue';
import DeviceDetail from '../pages/device/DeviceDetail.vue';

const props = defineProps({
  id: { type: String, required: true },
});
</script>

<style scoped></style>
