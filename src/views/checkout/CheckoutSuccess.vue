<template>
  <div class="flex items-center justify-center w-full h-full pt-20">
    <div class="relative md:w-[500px] md:h-fit pb-10 border-[1px] rounded-md">
      <div class="w-full flex justify-center absolute -top-[40px]">
        <div class="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-white shadow-d-20">
          <i class="text-5xl text-green-500 ri-check-line"></i>
        </div>
      </div>
      <div class="flex flex-col items-center justify-end w-full px-10 pt-14">
        <p class="text-3xl font-bold">Thank for your order!</p>
        <p class="mt-5">
          Thank for placing order <span class="text-third-100">#{{ $route.params.id ?? '' }}</span>
        </p>
        <p class="text-center">
          We will send you a confirmation email with details of your order and a link to track its progress.
        </p>
      </div>
      <div class="w-full border-b-[1px] py-5"></div>
      <div class="flex flex-col items-center w-full gap-10 mt-5">
        <p>Get in touch with us if you have any questions.</p>
        <div class="flex gap-4">
          <RouterLink to="/" class="border-[#3b5998] border-[1px] py-2 px-5 rounded-md">Back to shopping</RouterLink>
          <!-- <button class="bg-[#3b5998] text-white py-2 px-5 rounded-md" @click="toTracking">Track order</button> -->
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
