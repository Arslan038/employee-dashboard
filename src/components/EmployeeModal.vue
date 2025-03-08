<template>
    <Modal v-if="isOpen && employee" title="Employee Details" lg-width="1/3" @close="actions.closeModal">
        <template #body>
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
                <Button color="gray" @click="actions.closeModal">Cancel</Button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import Modal from './ui/Modal.vue';
import Button from '../components/ui/Button.vue';
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

const actions = {
    closeModal() {
        emits("close");
    }
};
</script>
