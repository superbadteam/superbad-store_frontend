<template>
  <div class="absolute top-[40px] right-0 fadeIn" @click.stop="">
    <!-- <div class="fixed w-[100vw] h-[100vh] z-50 top-0 left-0" @click="$emit('close')"></div> -->
    <div
      v-if="authStore.isLoggedIn"
      class="relative z-[60] flex flex-col w-[200px] h-[100px] border-[1px] rounded-[10px] bg-[#121213] border-[#363636] p-2"
    >
      <p class="border-b-[1px] pb-1 border-[#363636]">Hello, {{ authStore.user.name }}</p>
      <div class="hover:bg-[#1f1f21] rounded-[4px] py-[4px] px-1 mt-[2px] flex gap-2 cursor-pointer">
        <img src="@/assets/icons/setting.svg" alt="" />
        Settings
      </div>
      <div class="hover:bg-[#1f1f21] rounded-[4px] py-[4px] px-1 flex gap-2 cursor-pointer">
        <img src="@/assets/icons/logout.svg" alt="" />
        Logout
      </div>
    </div>
    <div
      v-if="!authStore.isLoggedIn"
      class="relative z-[60] flex flex-col w-[200px] h-fit border-[1px] rounded-[10px] bg-[#121213] border-[#363636] p-2"
    >
      <div class="hover:bg-[#1f1f21] py-[4px] px-1 flex gap-2 cursor-pointer">
        <img src="@/assets/icons/logout.svg" alt="" />
        Login
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
const authStore = useAuthStore()
defineEmits(['close'])
</script>
