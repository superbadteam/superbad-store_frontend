<script setup>
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

defineEmits(['update:modelValue'])
</script>
<template>
  <div class="flex flex-col gap-0 w-full">
    <p class="font-medium text-gray-700 text-base mb-2">
      {{ label }} <span v-if="isRequired" class="text-rose-600">*</span>
    </p>
    <input
      v-model="value"
      :class="styleCustom"
      class="w-full rounded-md"
      :type="isPassword ? 'password' : type"
      :placeholder="placeholder"
      :name="name"
    />
    <div class="w-full flex mt-2 items-center">
      <p class="text-rose-600 text-sm font-medium">
        <i v-if="errorMessage" class="ri-error-warning-fill mr-1"></i>{{ errorMessage }}</p>
    </div>
  </div>
</template>
