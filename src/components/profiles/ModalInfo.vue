<script setup>
defineEmits(['close'])
</script>
<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center z-10 w-screen h-screen bg-[#4c4e58b5]"
    @click="$emit('close')"
  >
    <div class="w-[500px] h-[300px] bg-white rounded-xl p-5" @click.stop>
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">
          <span
            >Profile
            <i class="ri-user-line text-xl"></i>
          </span>
        </h2>
        <div
          class="flex justify-center items-center w-[40px] h-[40px] bg-[#e5e5e5b5] cursor-pointer rounded-full"
          @click="$emit('close')"
        >
          <i class="ri-close-fill text-2xl"></i>
        </div>
      </div>
    </div>
  </div>
</template>
