<script setup>
defineEmits(['close'])
</script>
<template>
  <div
    class="fixed top-0 left-0 flex justify-center items-center z-10 w-screen h-screen bg-[#4c4e58b5]"
    @click="$emit('close')"
  >
    <div class="w-[550px] h-[400px] bg-[#f1f2f6] rounded-2xl p-5" @click.stop>
      <!-- header -->
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold text-[#5a4098]">
          <span
            >Change password
            <i class="ri-lock-line"></i>
          </span>
        </h2>
        <div
          class="flex justify-center items-center w-[40px] h-[40px] bg-[#e5e5e5b5] cursor-pointer rounded-full"
          @click="$emit('close')"
        >
          <i class="ri-close-fill text-2xl"></i>
        </div>
      </div>
      <!-- end header -->

      <form action="">
        <div class="mt-7">
          <label for="old-password" class="text-sm">Old password</label>
          <input
            id="old-password"
            type="password"
            class="text-xs w-full border border-[#E5E5E5] rounded-[6px] p-2 mt-2"
          />
        </div>
        <div class="mt-4">
          <label for="new-password" class="text-sm">New password</label>
          <input
            id="new-password"
            type="password"
            class="text-xs w-full border border-[#E5E5E5] rounded-[6px] p-2 mt-2"
          />
        </div>
        <div class="mt-4">
          <label for="confirm-password" class="text-sm">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            class="text-xs w-full border border-[#E5E5E5] rounded-[6px] p-2 mt-2"
          />
        </div>
        <div class="flex gap-3 mt-4">
          <button class="w-full text-gray-900 bg-white border-[1px] rounded-[6px] p-2 mt-2" @click="$emit('close')">
            <span class="text-sm font-medium">Exit</span>
          </button>
          <button class="w-full bg-[#5a4098] text-white rounded-[6px] p-2 mt-2">
            <span class="text-sm font-medium">Change password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
