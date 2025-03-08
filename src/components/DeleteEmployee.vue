<template>
    <Modal v-if="isOpen && employee" title="Delete Employee" lg-width="1/3" @close="actions.closeModal">
        <template #body>
            <div class="text-center">
                <p>Are you sure you want to delete "<strong class="text-red">{{ employee.fullName }}</strong>" ?</p>
            </div>

            <div class="flex justify-end mt-10">
                <Button color="red" class="mr-2" :loading="isLoading" @click="actions.deleteEmployee">Yes,
                    Delete</Button>
                <Button color="gray" :loading="isLoading" @click="actions.closeModal">Cancel</Button>
            </div>
        </template>
    </Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from './ui/Modal.vue';
import Button from '../components/ui/Button.vue';
import { useEmployeeStore } from '../stores/employee';

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

const emit = defineEmits(["close"]);

const store = useEmployeeStore();

const isLoading = ref(false);

const actions = {
    closeModal() {
        emit("close");
    },

    deleteEmployee() {
        isLoading.value = true;
        store.deleteEmployee(props.employee.id).then((data) => {
            actions.closeModal();
        }).finally(() => {
            isLoading.value = false;
        });
    }
};
</script>
