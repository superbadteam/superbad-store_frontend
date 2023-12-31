<script setup>
defineProps({
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
})
defineEmits(['update:modelValue'])
</script>
<template>
  <div class="flex flex-col gap-0 w-full">
    <p class="font-medium text-gray-700 text-base mb-2">
      {{ label }} <span v-if="isRequired" class="text-rose-600">*</span>
    </p>
    <input
      :value="modelValue"
      :class="styleCustom"
      class="w-full rounded-md"
      :type="isPassword ? 'password' : type"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
