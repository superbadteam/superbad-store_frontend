<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'confirm',
  },
})
</script>
<template>
  <div
    :class="`py-1 px-2 cursor-pointer rounded-md ${
      type === 'confirm' ? 'bg-blue-500 text-white' : ' bg-gray-500 text-white'
    }`"
  >
    <slot name="left"></slot>
    <span>{{ title }}</span>
    <slot name="right"></slot>
  </div>
</template>
