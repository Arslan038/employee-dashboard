// src/store/index.js
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});