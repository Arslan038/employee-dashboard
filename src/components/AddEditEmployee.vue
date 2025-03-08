<template>
    <!-- Modal Backdrop -->
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-5 z-50 flex items-center justify-center"
        @click.self="actions.closeModal">
        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/2 p-6">
            <!-- Modal Header -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold">{{ employee && employee.id ? 'Edit' : 'Add' }} Employee</h2>
                <button @click="actions.closeModal" class="text-gray-500 hover:text-gray-700 text-[20px] cursor-pointer">
                    &times;
                </button>
            </div>

            <!-- Modal Body -->
            <form @submit.prevent>
                <div class="grid grid-cols-2 gap-4">
                    <TextField v-model="employeeInfo.data.code" type="text" label="Employee Code"
                        placeholder="Enter Employee Code" />

                    <TextField v-model="employeeInfo.data.fullName" type="text" label="Full Name"
                        placeholder="Enter Employee Name" />

                    <TextField v-model="employeeInfo.data.occupation" type="text" label="Occupation"
                        placeholder="Enter Occupation" />

                    <TextField v-model="employeeInfo.data.department" type="text" label="Department"
                        placeholder="Enter Department" />

                    <TextField v-model="employeeInfo.data.dateOfEmployment" type="date" label="Employement Date"
                        placeholder="Employement Date" />

                    <TextField v-model="employeeInfo.data.terminationDate" type="date" label="Termination Date"
                        placeholder="Termination Date" />
                </div>

                <div class="flex justify-end mt-4">
                    <button type="submit" @click="actions.save"
                        class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300 cursor-pointer mr-2">
                        Save
                    </button>
                    <button type="button" @click="actions.closeModal"
                        class="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition duration-300 cursor-pointer">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue';
import TextField from '../assets/ui/TextField.vue';

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

const actions = {
    closeModal() {
        emits("close");
    },
    save() {

    }
}

watch(() => props.employee, (val) => {
    if (val) {
        employeeInfo.data = { ...val };
    }
}, { immediate: true })
</script>
