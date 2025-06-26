<script setup>
import { defineProps, defineEmits, watch } from 'vue'
import { useField } from 'vee-validate'
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
  styleCustom: {
    type: String,
    default: ' border-[2px] border-[#ebebeb]',
  },
  name: {
    type: String,
    default: '',
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
})
const { value, errorMessage } = useField(() => props.name)

const emit = defineEmits(['update:modelValue', 'input'])
watch(value, (newValue) => {
  emit('input', newValue)
  emit('update:modelValue', newValue)
})
</script>
<template>
  <div class="flex flex-col w-full gap-0">
    <p class="mb-2 text-base font-medium text-gray-700">
      {{ label }} <span v-if="isRequired" class="text-rose-600">*</span>
    </p>
    <input
      v-model="value"
      :class="styleCustom"
      class="w-full rounded-md focus:border-[2px]"
      :type="isPassword ? 'password' : type"
      :placeholder="placeholder"
      :name="name"
    />
    <div class="flex items-center w-full mt-2">
      <p class="text-sm font-medium text-rose-600">
        <i v-if="errorMessage" class="mr-1 ri-error-warning-fill"></i>{{ errorMessage }}</p>
    </div>
  </div>
</template>
