<template>
  <!-- create select have label -->
  <div class="relative">
    <label for="select" class="block mb-2 text-base font-medium text-gray-700">
      {{ label }} <span v-if="isRequired" class="text-rose-600">*</span>
    </label>
    <select
      id="select"
      v-model="value"
      name="select"
      class="mt-1 block w-full h-[44px] pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option value="" disabled selected>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.id">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
})
defineEmits(['update:modelValue'])
const value = ref(props.modelValue)
onBeforeMount(() => {
  value.value = props.modelValue
  console.log("----------->",value.value)
})
</script>
