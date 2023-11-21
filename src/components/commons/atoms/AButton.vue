<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div
    class="border-[1px] bg-[#5a4098] text-white cursor-pointer hover:shadow-lg border-[#5a4098] py-1 px-2 rounded-md"
  >
    <slot name="left"></slot>
    <span>{{ title }}</span>
    <slot name="right"></slot>
  </div>
</template>
