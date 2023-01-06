import { defineStore } from 'pinia';

export type Message = {
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
};

export const useMessagesStore = defineStore('messages', {
  state: () => {
    return {
      messages: [] as Message[],
    };
  },
});
