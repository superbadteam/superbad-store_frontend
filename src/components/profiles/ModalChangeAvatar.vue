<script setup>
import ACustomPopup from '../commons/atoms/ACustomPopup.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadApi } from '@/services/product.service'
import { ref } from 'vue'
import AFullLoading from '@/components/commons/atoms/AFullLoading.vue'
const isCreating = ref(false)
defineProps({
  img: {
    type: String,
    required: true,
  },
})
const emits = defineEmits(['close', 'cropped'])
const handleCrop = () => {
  isCreating.value = true
  cropper.value.getCroppedCanvas().toBlob((blob) => {
    const file = new File([blob], 'avatar.png', { type: 'image/png' })

    const formData = new FormData()

    formData.append('images', file)

    uploadApi(formData)
      .then((res) => {
        console.log(res)
        emits('cropped', res.data.urls[0])
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        isCreating.value = false
      })
  })
}

const cropper = ref(null)
</script>
<template>
  <AFullLoading v-show="isCreating">
    <template #content>
      <p class="text-lg">Uploading avatar...</p>
    </template>
  </AFullLoading>
  <ACustomPopup @close="$emit('close')">
    <div class="flex flex-col items-center relative w-[500px] px-2 py-5 pb-2">
      <div class="flex justify-between items-center px-5 w-full">
        <div class="w-[40px]"></div>
        <h1 class="text-2xl font-semibold">Change Avatar</h1>
        <div
          class="w-[40px] h-[40px] rounded-full cursor-pointer bg-slate-100 flex justify-center items-center"
          @click="$emit('close')"
        >
          <i class="ri-close-line text-2xl"></i>
        </div>
      </div>
      <div class="flex flex-col items-center w-full py-5 rounded-md overflow-y-auto max-h-[60vh]">
        <vue-cropper
          ref="cropper"
          class="w-full"
          :scalable="false"
          :zoomable="false"
          :aspectRatio="1"
          :src="img"
          alt="Source Image"
        >
        </vue-cropper>
      </div>
      <button class="bg-[#5a4098] text-white rounded-xl px-5 py-1 mt-2" @click="handleCrop">Change</button>
    </div>
  </ACustomPopup>
</template>
