import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Message = {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
};

export const useMessagesStore = defineStore('messages', () => {
  const messages = ref<Message[]>([]);

  function notify(message: Message) {
    messages.value.push(message);
  }

  function getMessage() {
    if (messages.value.length === 0) {
      return null;
    }
    return messages.value.shift();
  }

  return { messages, getMessage, notify };
});
