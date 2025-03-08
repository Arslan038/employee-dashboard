<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mb-4">
      <SearchInput class="md:col-span-2" @on-search="actions.onEmployeeSearch" />
      <div class="flex justify-end order-first md:order-last">
        <DownloadCsv :data="sortedPaginatedEmployees" :labels="labels" :filename="'employees.csv'">
          <Button color="purple" class="mr-1">Export to CSV</Button>
        </DownloadCsv>
        <Button color="blue" @click="actions.createEmployee">Create Employee</Button>
      </div>
    </div>

    <template v-if="loading">
      <div class="text-center my-5">
        Loading Employees...
      </div>
    </template>

    <template v-if="!loading">
      <!-- Employee Grid (Table for larger screens) -->
      <div class="hidden md:block">
        <table class="min-w-full bg-white border-b rounded-lg overflow-x-hidden">
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
            <tr v-for="employee in sortedPaginatedEmployees" :key="employee.id" class="hover:bg-gray-50">
              <td class="text-left text-sm py-2 px-3 border-t">{{ employee.fullName }}</td>
              <td class="text-left text-sm py-2 px-3 border-t">{{ employee.occupation }}</td>
              <td class="text-left text-sm py-2 px-3 border-t">{{ employee.department }}</td>
              <td class="text-left text-sm py-2 px-3 border-t">{{ actions.getEmploymentStatus(employee.dateOfEmployment)
                }}</td>
              <td class="text-left text-sm py-2 px-3 border-t">{{ actions.getTerminationStatus(employee.terminationDate)
                || 'N/A' }}</td>
              <td class="text-left text-sm py-2 px-3 border-t space-x-2">
                <!-- Employee Table Actions Dropdown -->
                <EmployeeActions>
                  <ul>
                    <li class="cursor-pointer p-1 px-2 hover:bg-gray-100" @click="actions.viewEmployee(employee)">View
                    </li>
                    <li class="cursor-pointer p-1 px-2 hover:bg-gray-100" @click="actions.editEmployee(employee)">Edit
                    </li>
                    <li class="cursor-pointer p-1 px-2 hover:bg-gray-100" @click="actions.deleteEmployee(employee)">
                      Delete
                    </li>
                  </ul>
                </EmployeeActions>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Employee Grid (Cards for smaller screens) -->
      <div class="block md:hidden">
        <div v-for="employee in sortedPaginatedEmployees" :key="employee.id"
          class="bg-white p-4 mb-4 border rounded-lg shadow-sm">
          <div class="space-y-2">
            <div><strong>Full Name:</strong> {{ employee.fullName }}</div>
            <div><strong>Occupation:</strong> {{ employee.occupation }}</div>
            <div><strong>Department:</strong> {{ employee.department }}</div>
            <div><strong>Date of Employment:</strong> {{ actions.getEmploymentStatus(employee.dateOfEmployment) }}</div>
            <div><strong>Termination Date:</strong> {{ actions.getTerminationStatus(employee.terminationDate) || 'N/A'
              }}
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

      <!-- Pagination Controls -->
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @next="actions.nextPage"
        @prev="actions.prevPage" />

      <!-- View Employee Details -->
      <EmployeeModal v-if="selectedEmployee && viewModal" :is-open="viewModal" :employee="selectedEmployee"
        @close="actions.closeModal" />

      <!-- Add or Edit Employee Form -->
      <AddEditEmployee v-if="addEditModal" :is-open="addEditModal" :employee="selectedEmployee"
        @close="actions.closeModal" />

      <!-- Delete Employee Form -->
      <DeleteEmployee v-if="deleteModal && selectedEmployee" :is-open="deleteModal" :employee="selectedEmployee"
        @close="actions.closeModal" />
    </template>
  </div>
</template>

<script setup>
import { computed, ref, reactive, watchEffect } from 'vue';
import SearchInput from './SearchInput.vue';
import Button from '../components/ui/Button.vue';
import EmployeeActions from './ui/EmployeeActions.vue';
import EmployeeModal from './EmployeeModal.vue';
import AddEditEmployee from './AddEditEmployee.vue';
import DeleteEmployee from './DeleteEmployee.vue';
import Pagination from './ui/Pagination.vue';
import DownloadCsv from 'vue-json-csv';

const props = defineProps({
  employees: Array,
  loading: Boolean
});

const label = {
  fullName: 'Full Name',
  code: 'Code',
  occupation: 'Occupation',
  dateOfEmployment: 'Date of Employment'
}

const columns = [
  { key: 'fullName', text: 'Full Name', sortable: true },
  { key: 'occupation', text: 'Occupation', sortable: true },
  { key: 'department', text: 'Department', sortable: true },
  { key: 'dateOfEmployment', text: 'Date of Employment', sortable: true },
  { key: 'terminationDate', text: 'Termination Date', sortable: true },
  { key: 'actions', text: 'Actions', sortable: false }
];

const employeeList = reactive({
  items: [...props.employees]
});

const itemsPerPage = ref(5);
const currentPage = ref(1);

const searchQuery = ref('');
const sortKey = ref('');
const sortDirection = ref('asc');

const viewModal = ref(false);
const addEditModal = ref(false);
const deleteModal = ref(false);

const selectedEmployee = ref(false);

const totalPages = computed(() => Math.ceil(filteredEmployees.value.length / itemsPerPage.value));

const filteredEmployees = computed(() => {
  let filtered = employeeList.items;

  // Filter Employees
  filtered = employeeList.items.filter((employee) =>
    Object.values(employee).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  return filtered;
});

// Paginate Employees (AFTER filtering & sorting)
const paginatedEmployees = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredEmployees.value.slice(start, end);
});

// Sort Employees (only on paginated employees)
const sortedPaginatedEmployees = computed(() => {
  if (!sortKey.value) return paginatedEmployees.value;

  return [...paginatedEmployees.value].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (aValue < bValue) return sortDirection.value === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === "asc" ? 1 : -1;
    return 0;
  });
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

  nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  },

  prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
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
    selectedEmployee.value = { ...item };
    deleteModal.value = true;
  },

  closeModal() {
    viewModal.value = false;
    addEditModal.value = false;
    deleteModal.value = false;

    selectedEmployee.value = null;
  }
}

// Watch Employee Prop to update the list
watchEffect(() => {
  employeeList.items = props.employees;
});
</script>