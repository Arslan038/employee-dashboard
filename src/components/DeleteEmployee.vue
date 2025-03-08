<template>
    <Modal v-if="isOpen && employee" title="Delete Employee" lg-width="1/3" @close="actions.closeModal">
        <template #body>
            <div class="text-center">
                <p>Are you sure you want to delete "<strong class="text-red">{{ employee.fullName }}</strong>" ?</p>
            </div>

            <div class="flex justify-end mt-10">
                <Button color="red" class="mr-2">Yes, Delete</Button>
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
