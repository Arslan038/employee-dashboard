<template>
    <div class="flex justify-between items-center mt-4">
        <Button color="gray" @click="actions.prevPage" :disabled="currentPage === 1">Previous</Button>
        <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
        <Button color="blue" @click="actions.nextPage" :disabled="currentPage === totalPages">Next</Button>
    </div>
</template>

<script setup>
import Button from './Button.vue';
const props = defineProps({
    currentPage: {
        type: Number,
        default: 1
    },
    totalPages: {
        type: Number,
        default: 1
    }
});

const emit = defineEmits(['next', 'prev'])
const actions = {
    nextPage() {
        emit('next')
    },
    prevPage() {
        emit('prev')
    }
}
</script>