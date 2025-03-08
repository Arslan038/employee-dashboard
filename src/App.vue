<template>
  <DashboardLayout>
    <div class="p-4 bg-white rounded shadow">
      <router-view></router-view>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "./layouts/DashboardLayout.vue"
</script>