<template>
    <Modal v-if="isOpen" :title="`${employee && employee.id ? 'Edit' : 'Add'} Employee`" persistent
        @close="actions.closeModal">
        <template #body>
            <form @submit.prevent="actions.save">
                <div class="grid grid-cols-2 gap-4">
                    <TextField v-model="employeeInfo.data.code" type="text" label="Employee Code*"
                        placeholder="Enter Employee Code" required />

                    <TextField v-model="employeeInfo.data.fullName" type="text" label="Full Name*"
                        placeholder="Enter Employee Name" required />

                    <TextField v-model="employeeInfo.data.occupation" type="text" label="Occupation*"
                        placeholder="Enter Occupation" required />

                    <TextField v-model="employeeInfo.data.department" type="text" label="Department*"
                        placeholder="Enter Department" required />

                    <TextField v-model="employeeInfo.data.dateOfEmployment" type="date" label="Employement Date"
                        placeholder="Employement Date" />

                    <TextField v-model="employeeInfo.data.terminationDate" type="date" label="Termination Date"
                        placeholder="Termination Date" />
                </div>

                <div class="flex justify-end mt-10">
                    <Button type="submit" color="blue" class="mr-2" :loadng="isLoading">Save</Button>
                    <Button type="button" color="gray" :loading="isLoading" @click="actions.closeModal">Cancel</Button>
                </div>
            </form>
        </template>
    </Modal>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import Modal from './ui/Modal.vue';
import TextField from '../components/ui/TextField.vue';
import Button from '../components/ui/Button.vue';
import { useEmployeeStore } from '../stores/employee';
import { useAppStore } from '../stores/app';
import dayjs from 'dayjs';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },

    employee: {
        type: Object,
        required: false
    },
});

const emit = defineEmits(["close"]);

const store = useEmployeeStore();
const appStore = useAppStore();

const isLoading = ref(false);

const employeeInfo = reactive({
    data: {
        id: null,
        fullName: null,
        occupation: null,
        code: null,
        department: null,
        dateOfEmployment: null,
        terminationDate: null
    }
});

const errors = ref([]);

const isMissingField = computed(() => {
    const { fullName, code, occupation, department } = employeeInfo.data;

    if (fullName && code && occupation && department) {
        return false
    }

    return true;
})

const actions = {
    closeModal() {
        emit("close");
    },
    isValidForm() {
        let isValid = true;

        const today = dayjs();

        // if (employeeInfo.data.dateOfEmployment) {
        //     const isFutureEmployed = dayjs(employeeInfo.data.dateOfEmployment).isAfter(today);
        //     if (isFutureEmployed) {
        //         appStore.showNotification('Employment Date should not be in future.', 'error');
        //         isValid = false;
        //         return
        //     }
        // }

        if (!employeeInfo.data.dateOfEmployment && employeeInfo.data.terminationDate) {
            appStore.showNotification('Employment Date is required for Termination Date.', 'error');
            isValid = false;
            return
        }

        if (employeeInfo.data.terminationDate && employeeInfo.data.dateOfEmployment) {
            const employedDate = dayjs(employeeInfo.data.dateOfEmployment);
            const isPastTerminated = dayjs(employeeInfo.data.terminationDate).isBefore(employedDate);
            if (isPastTerminated) {
                appStore.showNotification('Termination Date should not be in past of Employement Date.', 'error');
                isValid = false;
                return
            }
        }

        return isValid;

    },
    save() {
        if (!isMissingField.value) {
            const payload = { ...employeeInfo.data };

            if (!actions.isValidForm()) return;

            isLoading.value = true;

            if (!props.employee) {
                // Create New Employee
                store.addEmployee(payload).then(() => {
                    actions.closeModal();
                }).finally(() => {
                    isLoading.value = false;
                });
            } else {
                // Update Employee
                store.updateEmployee(payload).then(() => {
                    actions.closeModal();
                }).finally(() => {
                    isLoading.value = false;
                });
            }
        } else {
            console.log('errors')
        }
    }
}

watch(() => props.employee, (val) => {
    if (val) {
        employeeInfo.data = { ...val };
    }
}, { immediate: true })
</script>
