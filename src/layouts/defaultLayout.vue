<template>
  <div class="flex flex-col w-full items-center">
    <NavBar />

    <div class="mb-auto flex flex-col items-center h-[calc(100vh-90px)] overflow-y-auto w-full mt-[90px]">
      <slot></slot>
      <BottomFooter />
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/layouts/NavBar.vue'
import BottomFooter from '@/components/layouts/BottomFooter.vue';
import { onBeforeMount } from 'vue'
onBeforeMount(() => {
  console.log('default')
})
</script>
