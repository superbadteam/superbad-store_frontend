<template>
  <div class="fixed bg-opacity-50 top-0 left-0 w-full h-full z-[9999] flex items-center">
    <div class="w-full h-full flex justify-center items-center pt-14">
      <div class="relative p-7 h-fit bg-white gb-shadow rounded-3xl flex flex-col justify-center items-center">
        <!-- loading -->
        <div
          v-if="isProcessing"
          class="absolute bg-[#97979770] top-0 left-0 w-full h-full rounded-3xl z-[9999] flex justify-center items-center"
        >
          <img src="@/assets/icons/loading.svg" alt="" />
        </div>
        <p class="text-2xl font-semibold">Confirm</p>
        <p class="text-sm text-primary-200">{{ content }}</p>
        <div class="flex gap-5">
          <slot name="action">
            <AButton
              title="Cancel"
              type="cancel"
              class="mt-5 py-2 px-5 w-fit text-white bg-blue-500"
              @click="$emit('close')"
            >
            </AButton>
            <AButton
              title="Confirm"
              class="mt-5 py-2 px-5 items-center w-fit text-white bg-blue-500"
              @click="$emit('confirm')"
            >
            </AButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AButton from '@/components/commons/atoms/AButton.vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'confirm',
  },
  content: {
    type: String,
    default: 'Insert content here ',
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close', 'confirm'])
</script>
