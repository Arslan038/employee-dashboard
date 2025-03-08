<template>
    <header class="bg-white shadow-md p-4 flex justify-between items-center">
        <div class="flex items-center">
            <button @click="toggleSidebar" class="md:hidden p-2 text-black text-[24px] rounded">
                ☰
            </button>
            <div class="text-xl font-bold text-gray-700">MyApp</div>
        </div>

        <div class="relative">
            <!-- Badge with Avatar -->
            <div class="cursor-pointer flex items-center space-x-4" @click="toggleDropdown">
                <div class="relative">
                    <span v-if="notifications > 0"
                        class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {{ notifications }}
                    </span>
                    <img :src="user.avatar" alt="User Avatar"
                        class="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer" />
                </div>
                <span>{{ user.name }}</span>
            </div>

            <div class="relative">
                <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md">
                    <ul>
                        <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="toggleDropdown">Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(['toggleSidebar'])
const user = ref({
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
});

const notifications = ref(3);
const dropdownOpen = ref(false);

const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
};

const toggleSidebar = () => {
    emit('toggleSidebar');
}
</script>