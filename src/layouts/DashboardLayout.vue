<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside :class="[
        'fixed md:relative md:w-64 bg-blue-900 text-white flex flex-col transition-transform',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]" class="w-64 h-full p-4">
       <button
        @click="toggleSidebar"
        class="absolute top-4 right-4 text-white md:hidden cursor-pointer"
      >
        ✕
      </button>
        <div class="p-4 text-xl font-bold border-b border-blue-500">
          Purple Cross
        </div>
        <nav class="flex-1 p-4">
          <ul>
            <li v-for="item in menuItems" :key="item.text" class="mb-2">
              <RouterLink
                :to="item.link"
                class="block p-2 rounded hover:bg-blue-800"
                active-class="bg-blue-800"
                exact
              >
                {{ item.text }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 flex flex-col">
        <!-- Top Navbar -->
        <AppBar @toggleSidebar="toggleSidebar" />
  
        <!-- Content -->
        <main class="flex-1 p-6 overflow-auto">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import AppBar from "../components/ui/AppBar.vue";
  
  const menuItems = ref([
    { text: "Employee Management", link: "/" },
  ]);

  const isSidebarOpen = ref(false);

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
  </script>
  