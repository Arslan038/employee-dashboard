<template>
    <input v-model="query" type="text" placeholder="Filter employees..."
        class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['onSearch']);

const query = ref('');

watch(query, (val) => {
    emit('onSearch', val);
})
</script>