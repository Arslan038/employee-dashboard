<template>
    <div class="container mx-auto p-4">
      <!-- Employee Grid (Table for larger screens) -->
      <div class="hidden md:block">
        <table class="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead class="bg-gray-100">
            <tr>
              <th class="text-left py-3 px-3">Full Name</th>
              <th class="text-left py-3 px-3">Occupation</th>
              <th class="text-left py-3 px-3">Department</th>
              <th class="text-left py-3 px-3">Date of Employment</th>
              <th class="text-left py-3 px-3">Termination Date</th>
              <th class="text-left py-3 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id" class="hover:bg-gray-50">
              <td class="text-left py-3 px-3 border-t">{{ employee.fullName }}</td>
              <td class="text-left py-3 px-3 border-t">{{ employee.occupation }}</td>
              <td class="text-left py-3 px-3 border-t">{{ employee.department }}</td>
              <td class="text-left py-3 px-3 border-t">{{ employee.dateOfEmployment }}</td>
              <td class="text-left py-3 px-3 border-t">{{ employee.terminationDate || 'N/A' }}</td>
              <td class="text-left py-3 px-3 border-t space-x-2">
                <button class="text-blue-500 hover:text-blue-700">View</button>
                <button class="text-green-500 hover:text-green-700">Edit</button>
                <button class="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Employee Grid (Cards for smaller screens) -->
      <div class="block md:hidden">
        <div v-for="employee in employees" :key="employee.id" class="bg-white p-4 mb-4 border rounded-lg shadow-sm">
          <div class="space-y-2">
            <div><strong>Full Name:</strong> {{ employee.fullName }}</div>
            <div><strong>Occupation:</strong> {{ employee.occupation }}</div>
            <div><strong>Department:</strong> {{ employee.department }}</div>
            <div><strong>Date of Employment:</strong> {{ employee.dateOfEmployment }}</div>
            <div><strong>Termination Date:</strong> {{ employee.terminationDate || 'N/A' }}</div>
            <div class="flex space-x-2">
              <button class="text-blue-500 hover:text-blue-700">View</button>
              <button class="text-green-500 hover:text-green-700">Edit</button>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { employees } from '../utils/employees';
  </script>