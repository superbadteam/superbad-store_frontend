<script setup>
defineEmits(['close'])
</script>
<template>
  <div
    class="w-[100vw] h-[100vh] bg-secondary-light fixed top-0 left-0 z-[100] flex justify-center items-center"
    @click="$emit('close')"
  >
    <div class="bg-white rounded-3xl h-fit w-fit" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
