<script setup>
import { ref } from 'vue'
import { uploadApi } from '@/services/product.service'
const props = defineProps(['modelValue', 'autoUpload'])
const emits = defineEmits(['update:modelValue', 'startUpload', 'endUpload'])
const filePicker = ref(null)
const openFilePicker = () => {
  filePicker.value.click()
}

const onFileChange = async (e) => {
  const files = e.target.files
  if (files.length) {
    const file = files[0]
    console.log(file)
    if (props.autoUpload) {
      const formData = new FormData()
      formData.append('images', file)
      emits('startUpload')
      try {
        const res = await uploadApi(formData)
        console.log(res)
        emits('update:modelValue', res.data.urls[0])
      } catch (error) {
        console.log(error)
      } finally {
        emits('endUpload')
      }
    } else {
      emits('update:modelValue', file)
    }
    // clear file input
    filePicker.value.value = ''
  }
}
</script>
<template>
  <div class="w-full h-full" @click="openFilePicker">
    <input ref="filePicker" type="file" style="display: none" @change="onFileChange" />
  </div>
</template>
