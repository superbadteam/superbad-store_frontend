<template>
  <div class="flex flex-col w-full items-center">
    <NavBar />

    <div
      ref="mainElement"
      class="mb-auto flex flex-col items-center h-[calc(100vh-90px)] overflow-y-auto w-full mt-[90px]"
    >
      <slot></slot>
      <BottomFooter />
    </div>
  </div>
</template>

<script setup>
import NavBar from '@/components/layouts/NavBar.vue'
import BottomFooter from '@/components/layouts/BottomFooter.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
const route = useRoute()
const mainElement = ref(null)

// watching route change and scroll to top
watch(
  () => route.fullPath,
  () => {
    mainElement.value.scrollTo(0, 0)
  }
)
</script>
