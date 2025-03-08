<template>
    <div>
        <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
            {{ label }}
        </label>
        <input :id="id" :value="modelValue" :type="type" :placeholder="placeholder" @input="handleInput"
            class="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
})
const emit = defineEmits(['update:modelValue']);

const query = ref('');

const handleInput = (e) => {
    emit('update:modelValue', e.target.value);
}
</script>