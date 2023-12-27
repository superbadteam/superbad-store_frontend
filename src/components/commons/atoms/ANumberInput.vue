<template>
  <div class="flex border-[2px] rounded-md px-2 py-1">
    <input
      v-model="val"
      class="py-0 border-none w-[100px]"
      style="outline: none"
      type="number"
      min="1"
      :max="max"
      step="1"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="flex gap-2">
      <!-- increase and decrease btn -->
      <button class="bg-primary-300 rounded-sm w-6 h-full" @click="decrease">-</button>
      <button class="bg-primary-300 rounded-sm w-6 h-full" @click="increase">+</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 9,
  },
})
const emits = defineEmits(['update:modelValue'])
const increase = () => {
  if (val.value + 1 > props.max) {
    return
  }
  val.value++
  emits('update:modelValue', val.value)
  console.log('increase')
}
const decrease = () => {
  if (val.value - 1 < 1) {
    val.value = 1
  } else val.value--
  emits('update:modelValue', val.value)
  console.log('decrease')
}
const val = ref(1)
</script>
<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* disable border on focus */
input[type='number'] {
  border: none !important;
}
input[type='number']:focus {
  outline: none;
}
</style>
