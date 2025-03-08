<template>
  <div>
    <EmployeeGrid :employees="employees" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import EmployeeGrid from '../components/EmployeeGrid.vue';
import { useEmployeeStore } from '../stores/employee';

const store = useEmployeeStore();

onMounted(() => {
  store.fetchEmployees();
})

const employees = computed(() => store.employees);

</script>

