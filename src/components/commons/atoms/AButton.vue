<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div class="bg-[#5a4098] py-1 px-2 cursor-pointer rounded-md">
    <slot name="left"></slot>
    <span>{{ title }}</span>
    <slot name="right"></slot>
  </div>
</template>
