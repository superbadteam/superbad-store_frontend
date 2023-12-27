<template>
  <div class="w-full h-full flex pt-20 justify-center items-center">
    <div class="relative md:w-[500px] md:h-fit pb-10 border-[1px] rounded-md">
      <div class="w-full flex justify-center absolute -top-[40px]">
        <div class="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-white shadow-d-20">
          <i class="ri-check-line text-green-500 text-5xl"></i>
        </div>
      </div>
      <div class="flex px-10 flex-col w-full pt-14 justify-end items-center">
        <p class="text-3xl font-bold">Thank for your order!</p>
        <p class="mt-5">
          Thank for placing order <span class="text-third-100">#{{ $route.params.id ?? '' }}</span>
        </p>
        <p class="text-center">
          We will send you a confirmation email with details of your order and a link to track its progress.
        </p>
      </div>
      <div class="w-full border-b-[1px] py-5"></div>
      <div class="w-full flex gap-10 flex-col items-center mt-5">
        <p>Get in touch with us if you have any questions.</p>
        <div class="flex gap-4">
          <RouterLink to="/" class="border-[#3b5998] border-[1px] py-2 px-5 rounded-md">Back to shopping</RouterLink>
          <button class="bg-[#3b5998] text-white py-2 px-5 rounded-md" @click="toTracking">Track order</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const toTracking = () => {
  router.push({ name: 'tracking-order', params: { id: route.params.id } })
}
</script>
