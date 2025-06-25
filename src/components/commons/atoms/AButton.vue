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
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <div
    :class="`py-1 px-2 cursor-pointer rounded-md ${
      type === 'confirm' ? 'bg-blue-500 text-white' : ' bg-gray-500 text-white'
    }`"
  >
    <template v-if="!loading">
      <slot name="left" />
      <span>{{ title }}</span>
      <slot name="right" />
    </template>
    <template v-else>
      <!-- spinner -->
      <i class="svg-spinners-180-ring-with-bg" />
    </template>
  </div>
</template>
