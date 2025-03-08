<template>
    <div>
        <!-- Modal Backdrop -->
        <div class="fixed inset-0 bg-black opacity-50" @click.self="closeModal"></div>

        <div class="fixed inset-0 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6" :class="`lg:w-${lgWidth}`">
                <!-- Modal Header -->
                <div class="flex justify-between items-center pb-2 mb-4 border-b border-gray-200">
                    <h2 class="text-xl font-semibold">{{ title }}</h2>
                    <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-[20px] cursor-pointer">
                        &times;
                    </button>
                </div>

                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    lgWidth: {
        type: String,
        default: '1/2'
    }
});

const emit = defineEmits(['close'])

const closeModal = () => {
    emit('close');
}
</script>