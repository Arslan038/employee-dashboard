import { defineStore } from 'pinia';
import EmployeeService from '../services/EmployeeService';
import { useAppStore } from '../stores/app';

export const useEmployeeStore = defineStore('employeeStore', {
  state: () => ({
    employees: [],
    isLoading: false,
  }),

  actions: {
    async fetchEmployees() {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        this.isLoading = true;
        EmployeeService.getEmployees().then((response) => {
          if (response.status === 200) {
            this.employees = [...response.data];
            resolve(this.employees);
          }
          reject(response)
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to load employees', 'error');
          reject(err);
        }).finally(() => {
          this.isLoading = false;
        });
      })
    },

    async addEmployee(employee) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        EmployeeService.createEmployee(employee).then((response) => {
          this.employees.push(response.data);
          appStore.showNotification('Employee added successfully', 'success');
          resolve(response.data);
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to add employee', 'error');
          reject(err);
        })
      })
    },

    updateEmployee(updatedEmployee) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        EmployeeService.updateEmployee(updatedEmployee.id, updatedEmployee).then((response) => {
          if (response.status === 200) {
            const employee = { ...response.data };

            this.employees = this.employees.map((item) =>
              item.id === updatedEmployee.id ? { ...employee } : item
            );

            appStore.showNotification('Employee updated successfully', 'success');

            resolve(employee);
          }
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to load employees', 'error');
          reject(err);
        });
      })
    },

    async deleteEmployee(id) {
      const appStore = useAppStore();
      return new Promise((resolve, reject) => {
        EmployeeService.deleteEmployee(id).then((response) => {
          if (response.status === 200) {
            this.employees = this.employees.filter(employee => employee.id !== id);
            appStore.showNotification('Employee deleted successfully', 'success');
            resolve(response.data);
          }
        }).catch(err => {
          appStore.showNotification(err.response.data || 'Failed to delete employee', 'error');
          reject(err);
        });
      })
    }
  }
});
