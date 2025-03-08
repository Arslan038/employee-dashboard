<template>
    <Modal v-if="isOpen" :title="`${employee && employee.id ? 'Edit' : 'Add'} Employee`" @close="actions.closeModal">
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
                    <Button type="submit" color="blue" class="mr-2">Save</Button>
                    <Button type="button" color="gray" @click="actions.closeModal">Cancel</Button>
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

const emits = defineEmits(["close"]);

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
    // if (!fullName) {
    //     errors.value.push({ key: fullName, text: 'Full name is required.' });
    // }
    // if (!code) {
    //     errors.value.push({ key: fullName, text: 'Employee Code is required.' })
    // }
    // if (!occupation) {
    //     errors.value.push({ key: fullName, text: 'Occupation is required.' })
    // }
    // if (!department) {
    //     errors.value.push({ key: fullName, text: 'Department is required.' })
    // }

    if (fullName && code && occupation && department) {
        return false
    }

    return true;
})

const actions = {
    closeModal() {
        emits("close");
    },
    save() {
        if (!isMissingField.value) {
            console.log('submit')
            console.log(employeeInfo.data)
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
