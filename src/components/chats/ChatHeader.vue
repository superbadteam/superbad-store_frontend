<script setup>
import { ref } from 'vue'
const currentTab = ref('chat')
</script>
<template>
  <div class="w-fit h-full p-3 bg-[#1b1919ba] flex flex-col items-center gap-7">
    <div
      class="w-[45px] h-[45px] rounded-full flex justify-center items-center hover:bg-[var(--gray-hover)] cursor-pointer"
      :class="{ 'bg-[var(--gray-hover)]': currentTab == 'chat' }"
    >
      <img src="@/assets/icons/chat.svg" alt="" />
    </div>
    <div
      class="w-[45px] h-[45px] rounded-full flex justify-center items-center hover:bg-[var(--gray-hover)] cursor-pointer"
      :class="{ 'bg-[var(--gray-hover)]': currentTab == 'list' }"
    >
      <img src="@/assets/icons/list.svg" alt="" />
    </div>
    <div
      class="w-[45px] h-[45px] rounded-full flex justify-center items-center hover:bg-[var(--gray-hover)] cursor-pointer"
      :class="{ 'bg-[var(--gray-hover)]': currentTab == 'camera' }"
    >
      <img src="@/assets/icons/camera.svg" alt="" />
    </div>
  </div>
</template>
