<template>
  <div>
    <EmployeeGrid :loading="isLoading" :employees="employees" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import EmployeeGrid from '../components/EmployeeGrid.vue';
import { useEmployeeStore } from '../stores/employee';
import { storeToRefs } from 'pinia';

const store = useEmployeeStore();

const { isLoading, employees } = storeToRefs(store);
onMounted(() => {
  store.fetchEmployees();
})

// const employees = computed(() => store.employees);

</script>

