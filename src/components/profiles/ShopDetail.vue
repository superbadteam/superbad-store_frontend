<template>
  <div class="w-full py-8 flex items-center">
    <div class="flex gap-4">
      <img
        class="w-[80px] h-[80px] rounded-full"
        src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
      <div class="flex flex-col justify-center">
        <p class="text-lg font-bold">{{ shop.name }}</p>
        <p class="font-medium">Rombo shop</p>
      </div>
    </div>
    <div class="flex ml-5">
      <router-link
        :to="`/shop/${shop.id}`"
        class="border-[2px] border-third-100 h-fit text-third-100 py-2 px-3 rounded-md"
      >
        <i class="ri-store-2-fill"></i> View shop
      </router-link>
    </div>
    <div></div>
  </div>
</template>
<script setup>
defineProps({
  shop: {
    type: Object,
    required: true,
  },
})
</script>
