<template>
    <div v-if="appStore.notification.show" id="alert" class="fixed z-100 top-10 right-10 mx-auto w-auto text-center text-white">
        <!-- Alert Content -->
        <div class="inline-block px-6 py-2 rounded-lg shadow-lg" :class="appStore.notification.type === 'success' ? 'bg-green-800' : 'bg-red-800'">
            <span id="alert-message">{{ appStore.notification.message }}</span>
        </div>
    </div>
</template>

<script setup>
import { useAppStore } from '../../stores/app';

const appStore = useAppStore();
</script>