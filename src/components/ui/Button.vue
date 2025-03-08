<template>
    <div>
        <button :type="type" :disabled="disabled || loading"
        :class="`bg-${color}-800 text-white px-6 py-2 rounded hover:bg-${color}-600 disabled:bg-${color}-300 transition duration-300 cursor-pointer`" @click="onClick">
        <slot></slot>
    </button>
    </div>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    color: {
        type: String,
        default: 'blue'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['click']);

const onClick = () => {
    emit('click')
}
</script>