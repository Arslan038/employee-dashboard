<template>
    <!-- Modal Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-5 z-50 flex items-center justify-center"
        @click.self="closeModal">
        <!-- Modal Content -->
        <div v-if="employee" class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/2 p-6">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">Employee Details</h2>
                <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-[20px] cursor-pointer">
                    &times;
                </button>
            </div>

            <!-- Modal Body -->
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col">
                    <strong>Full Name:</strong>
                    <span>{{ employee.fullName }}</span>
                </div>
                <div class="flex flex-col"><strong>Full Name:</strong> {{ employee.fullName }}</div>
                <div class="flex flex-col"><strong>Occupation:</strong> {{ employee.occupation }}</div>
                <div class="flex flex-col"><strong>Department:</strong> {{ employee.department }}</div>
                <div class="flex flex-col"><strong>Date of Employment:</strong> {{ employee.dateOfEmployment }}
                </div>
                <div class="flex flex-col"><strong>Termination Date:</strong> {{ employee.terminationDate ||
                    'N/A' }}
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex justify-end mt-10">
                <Button color="gray" @click="closeModal">Cancel</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from '../assets/ui/Button.vue';
const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    employee: {
        type: Object,
        required: true
    },
});

const emits = defineEmits(["close"]);

// Close modal function
const closeModal = () => {
    emits("close");
};
</script>
