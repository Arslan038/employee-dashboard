<template>
    <div>
        <div class="relative" v-click-outside="closeDropdown">
            <div class="cursor-pointer flex items-center space-x-4" @click="toggleDropdown">
                <img src="../../assets/icons/vertical-dots.svg" alt="Actions" class="h-6 w-6" srcset="">
            </div>

            <div class="relative" @click="toggleDropdown">
                <div v-if="dropdownOpen" class="absolute z-10 right-0 mt-2 w-auto bg-white shadow-md rounded-md">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const dropdownOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const closeDropdown = () => {
    dropdownOpen.value = false;
}
</script>