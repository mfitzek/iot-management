<template>
  <q-input
    :modelValue="visibleDate"
    type="text"
    :label="label"
    :filled="filled"
    @click="confirm = true"
    prepend-icon="date"
    clearable
    @clear="update(null)"
  >
    <template #append>
      <q-icon name="s_calendar_month" />
    </template>
  </q-input>

  <q-dialog v-model="confirm">
    <q-card class="dateTimeDialog">
      <q-card-section>
        <div class="row q-gutter-md items-start">
          <q-date
            v-model="date"
            @update:modelValue="update"
            mask="YYYY-MM-DD HH:mm"
          />

          <q-time
            v-model="date"
            format24h
            @update:modelValue="update"
            mask="YYYY-MM-DD HH:mm"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  label?: string;
  modelValue?: number | Date;
  filled?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const confirm = ref(false);
const date = ref<string | undefined>(undefined);

const visibleDate = computed(() => {
  if (date.value) {
    return new Date(date.value).toLocaleString();
  }
  return '';
});

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      const current = new Date(value).toLocaleString('sv');
      date.value = current.slice(0, 16);
    } else {
      date.value = undefined;
    }
  }
);

function update(value: string | null) {
  if (!value) {
    emit('update:modelValue', undefined);
    return;
  }
  const result = new Date(value);
  emit('update:modelValue', result);
}
</script>

<style>
.dateTimeDialog {
  max-width: 700px !important;
  width: fit-content;
}
</style>
