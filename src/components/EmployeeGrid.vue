<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-3 items-center gap-4 mb-4">

      <SearchInput class="col-span-2" @on-search="actions.onEmployeeSearch" />
      <div class="flex justify-end">
        <button class="bg-blue-500 rounded py-2 px-6 text-white" @click="actions.createEmployee">Create Employee</button>
      </div>  
    </div>
    
    <!-- Employee Grid (Table for larger screens) -->
    <div class="hidden md:block">
      <table class="min-w-full bg-white border rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th v-for="column in columns" :key="column" class="py-3 px-3 hover:cursor-pointer"
              @click="actions.sort(column)">
              <div class="flex justify-start items-center">
                <span class="text-sm">{{ column.text }}</span>
                <img v-if="column.sortable" src="../assets/icons/sort.svg" class="ml-1 h-4 w-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50">
            <td class="text-left text-sm py-2 px-3 border-t">{{ employee.fullName }}</td>
            <td class="text-left text-sm py-2 px-3 border-t">{{ employee.occupation }}</td>
            <td class="text-left text-sm py-2 px-3 border-t">{{ employee.department }}</td>
            <td class="text-left text-sm py-2 px-3 border-t">{{ actions.getEmploymentStatus(employee.dateOfEmployment)
            }}</td>
            <td class="text-left text-sm py-2 px-3 border-t">{{ actions.getTerminationStatus(employee.terminationDate)
              || 'N/A' }}</td>
            <td class="text-left text-sm py-2 px-3 border-t space-x-2">
              <button class="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                @click="actions.viewEmployee(employee)">View</button>
              <button class="text-green-500 hover:text-green-700 hover:cursor-pointer"
                @click="actions.editEmployee(employee)">Edit</button>
              <button class="text-red-500 hover:text-red-700 hover:cursor-pointer"
                @click="actions.deleteEmployee(employee)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Employee Grid (Cards for smaller screens) -->
    <div class="block md:hidden">
      <div v-for="employee in filteredEmployees" :key="employee.id"
        class="bg-white p-4 mb-4 border rounded-lg shadow-sm">
        <div class="space-y-2">
          <div><strong>Full Name:</strong> {{ employee.fullName }}</div>
          <div><strong>Occupation:</strong> {{ employee.occupation }}</div>
          <div><strong>Department:</strong> {{ employee.department }}</div>
          <div><strong>Date of Employment:</strong> {{ actions.getEmploymentStatus(employee.dateOfEmployment) }}</div>
          <div><strong>Termination Date:</strong> {{ actions.getTerminationStatus(employee.terminationDate) || 'N/A' }}
          </div>
          <div class="flex space-x-2">
            <button class="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
              @click="actions.viewEmployee(employee)">View</button>
            <button class="text-green-500 hover:text-green-700 hover:cursor-pointer"
              @click="actions.editEmployee(employee)">Edit</button>
            <button class="text-red-500 hover:text-red-700 hover:cursor-pointer"
              @click="actions.deleteEmployee(employee)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <EmployeeModal v-if="selectedEmployee && viewModal" :is-open="viewModal" :employee="selectedEmployee"
      @close="actions.closeModal" />

    <AddEditEmployee v-if="addEditModal" :is-open="addEditModal" :employee="selectedEmployee" @close="actions.closeModal" />
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue';
import { employees } from '../utils/employees';
import SearchInput from './SearchInput.vue';
import EmployeeModal from './EmployeeModal.vue';
import AddEditEmployee from './AddEditEmployee.vue';

const columns = [
  { key: 'fullName', text: 'Full Name', sortable: true },
  { key: 'occupation', text: 'Occupation', sortable: true },
  { key: 'department', text: 'Department', sortable: true },
  { key: 'dateOfEmployment', text: 'Date of Employment', sortable: true },
  { key: 'terminationDate', text: 'Termination Date', sortable: true },
  { key: 'actions', text: 'Actions', sortable: false }
];

const employeeList = reactive({
  items: [...employees]
});

const searchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref('asc');

const viewModal = ref(false);
const addEditModal = ref(false);
const deleteModal = ref(false);

const selectedEmployee = ref(false);

const filteredEmployees = computed(() => {
  let filtered = [];

  // Filter Employees
  filtered = employeeList.items.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  // Sort Employees
  if (sortKey.value) {
    filtered.sort((a, b) => {
      const aValue = a[sortKey.value];
      const bValue = b[sortKey.value];

      if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // If Search is empty and no column sorted return default list
  if (!searchQuery.value && !sortKey.value) return employeeList.items;

  return filtered;
});

const actions = {
  onEmployeeSearch(query) {
    searchQuery.value = query;
  },

  sort(column) {
    if (column && column.sortable) {
      const key = column.key;

      if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
      }
    }

  },

  // Get employment status
  getEmploymentStatus(date) {
    const today = new Date();
    const employmentDate = new Date(date);
    if (employmentDate > today) return 'Employed soon';
    return 'Currently employed';
  },

  // Get termination status
  getTerminationStatus(date) {
    if (!date) return 'N/A';
    const today = new Date();
    const terminationDate = new Date(date);
    if (terminationDate > today) return 'To be terminated';
    return 'Terminated';
  },

  createEmployee() {
    selectedEmployee.value = null;
    addEditModal.value = true;
  },

  viewEmployee(item) {
    selectedEmployee.value = { ...item };
    viewModal.value = true;
  },

  editEmployee(item) {
    selectedEmployee.value = { ...item };
    addEditModal.value = true;
  },

  deleteEmployee(item) {

  },

  closeModal() {
    viewModal.value = false;
    addEditModal.value = false;
    deleteModal.value = false;

    selectedEmployee.value = null;
  }
}
</script>