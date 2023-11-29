<template>
  <div class="flex w-full justify-center">
    <NavBar />

    <div class="mb-auto flex h-[calc(100vh-90px)] justify-center overflow-y-auto w-full mt-[90px]">
      <SideBar />
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/layouts/NavBar.vue'
import SideBar from '@/components/layouts/SideBar.vue'
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  console.log('default')
})
</script>
