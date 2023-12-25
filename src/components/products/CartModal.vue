<template>
  <div class="absolute bg-white shadow-d-10 top-10 right-0 w-[380px] h-fit rounded-lg border-[1px]">
    <div class="w-full flex px-5 pt-3 justify-between">
      <p class="text-base text-gray-700 font-medium">My cart</p>
      <p class="text-sm text-gray-700 font-medium">Total: ${{ cart.totalPrice }}</p>
    </div>
    <!-- line -->
    <div class="border-b-[1px] mt-3"></div>
    <!-- end line -->
    <div class="w-full p-1 px-2 h-[300px] overflow-y-auto">
      <div
        v-for="item in cart.items"
        :key="item.id"
        class="flex gap-4 p-2 cursor-pointer hover:bg-slate-100 rounded-md justify-between"
      >
        <div class="w-[50px] min-w-[50px] h-[50px] rounded-md">
          <img class="w-full h-full object-cover rounded-md" :src="item.productType.product.imageUrl" alt="" />
        </div>
        <div class="flex flex-auto flex-col w-[30%]">
          <p class="truncate font-medium">{{ item.productType.product.name }}</p>
          <p>
            <span>{{ item.quantity }}</span> items - {{ item.productType.name }}
          </p>
        </div>
        <p class="text-sm whitespace-nowrap font-bold text-gray-700">${{ item.totalPrice }}</p>
      </div>
    </div>
    <div class="border-b-[1px] mt-3"></div>
    <!-- btn checkout -->
    <div class="p-5">
      <RouterLink
        to="/checkout"
        class="flex items-center justify-center rounded-md text-white text-base font-medium flex-auto bg-third-100 w-full h-[40px]"
        @click="$emit('close')"
      >
        Checkout
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMasterStore } from '@/stores/master.store'
const masterStore = useMasterStore()
defineEmits(['close'])
// import { useCartStore } from '@/stores/cart.store'
// const cartStore = useCartStore().state
const cart = computed(() => masterStore.state.cart)
// const total = computed(() => {
//   let total = 0
//   cart.value.forEach((item) => {
//     total += item.price * item.quantity
//   })
//   return total
// })
</script>
