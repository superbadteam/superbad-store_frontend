<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="flex flex-col w-[200px] min-w-[200px] h-[330px] overflow-hidden product-card-shadow bg-white rounded-xl">
    <img class="h-[180px] object-cover w-full" :src="product.image" alt="" />
    <div class="flex-auto p-3">
      <p class="text-sm font-semibold text-[#363636] truncate-2">{{ product.name }}</p>
      <p class="mt-1 font-bold text-lg">${{ product.cost }}</p>
      <span class="bg-[#fff1f1] text-[#ff5353] text-xs font-bold px-1 py-1">{{ product.discount }}%</span>
      <span class="text-secondary text-xs px-1 py-1">$100.00</span>
      <div>
        <i class="ri-map-pin-2-fill text-secondary"></i>
        <span class="ml-2 text-xs text-secondary">{{ product.location }}</span>
      </div>
      <div class="text-secondary text-xs">
        <span>
          <i class="ri-star-fill text-[#ffaa28]"></i>
          <span class="ml-2 mr-1">{{ product.star }}</span>
          <span>|</span>
          <span class="ml-1">sold {{ product.sold }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
