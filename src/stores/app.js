import { defineStore } from 'pinia';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    notification: {
      message: '',
      type: '', // 'success' or 'error'
      show: false
    }
  }),

  actions: {
    showNotification(message, type = 'success') {
      this.notification = { message, type, show: true };
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    }
  }
});
