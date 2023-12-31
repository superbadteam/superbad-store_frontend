<template>
  <div class="w-full grid grid-cols-2 gap-4">
    <div v-for="item in images" :key="item.id" class="relative">
      <div
        class="w-6 h-6 flex justify-center items-center cursor-pointer absolute top-2 right-2 bg-white rounded-full"
        @click="removeImage(item.id)"
      >
        <i class="ri-close-fill text-xl"></i>
      </div>
      <lazyImg class-style="w-full h-[150px] object-cover rounded-md" :src="item.url" alt="image" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
})

const emits = defineEmits(['update:modelValue'])

const removeImage = (id) => {
  const newImages = props.images.filter((item) => item.id !== id)
  emits('update:modelValue', newImages)
}
</script>
