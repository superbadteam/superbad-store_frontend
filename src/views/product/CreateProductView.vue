<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import Quill from 'quill'
import '@/assets/css/quill.snow.css'
// components
import ImageByTypePicker from '@/components/products/CreatorModules/ImageByTypePicker.vue'
import AFilePond from '@/components/commons/atoms/AFilePond.vue'
import AFullLoading from '@/components/commons/atoms/AFullLoading.vue'
// services
import { uploadApi, createProductApi } from '@/services/product.service'
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Create product',
    path: '/create-product',
  },
])

const editor = ref(null)
const vEditor = ref(null)

onBeforeUnmount(() => {
  editor.value = null
})

onMounted(() => {
  console.log('editor', editor.value)
  editor.value = new Quill(vEditor.value, {
    theme: 'snow',
    placeholder: 'Write description...',
  })
})

const onCreate = async () => {
  newProduct.value.description = editor.value.root.innerHTML
  console.log('newProduct', newProduct.value, files.value)
  isCreating.value = true
  // upload images
  await Promise.all(
    files.value.map(async (file) => {
      try {
        const res = await uploadImage(file.file)
        newProduct.value.images.push(res.data.data)
        totalImageUploaded.value.success++
      } catch (error) {
        totalImageUploaded.value.error++
      }
    })
  )
  // create product
  createProductApi(newProduct.value)
    .then((res) => {
      console.log(res)
      isCreating.value = false
    })
    .catch((err) => {
      console.log(err)
      isCreating.value = false
    })
}

const newProduct = ref({
  name: '',
  description: '',
  category: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  condition: 'new',
  types: [],
  images: [],
})

const uploadImage = async (file) => {
  if (file) {
    const formData = new FormData()
    formData.append('file', file)
    return await uploadApi(formData)
  }
}
const files = ref([])
const isCreating = ref(false)
const totalImageUploaded = ref({
  success: 0,
  error: 0,
})
</script>
<template>
  <AFullLoading v-show="isCreating">
    <template #content>
      <p v-if="totalImageUploaded.success !== files.length" class="text-lg">
        Uploading image... {{ totalImageUploaded.success }}/{{ files.length }}
      </p>
      <p v-else class="text-lg">Creating product...</p>
    </template>
  </AFullLoading>
  <!-- <div class="flex w-full px-5 pt-7 pb-10 justify-center gap-5"> -->
  <div class="flex flex-col w-full h-fit max-w-[1200px] max-[1254px]:w-full pt-10 rounded-[8px] py-5">
    <!-- header -->
    <header class="flex flex-col gap-2 w-full">
      <h1 class="text-2xl font-semibold">Create new product</h1>
      <BreadCrumb :routes="routes" />
    </header>
    <div class="w-full mt-12">
      <AButton title="Create" class="w-fit py-2 px-3 ml-auto bg-blue-500" @click="onCreate">
        <template #left>
          <i class="ri-save-line"></i>
        </template>
      </AButton>
    </div>
    <!-- body -->
    <div class="flex w-full mt-5 gap-10 h-min">
      <!-- image upload -->
      <div class="flex-1">
        <div class="min-h-[715px] h-full overflow-y-auto p-2 shadow-sm border-[1px] rounded-xl">
          <div class="w-full h-[500px]">
            <AFilePond v-model="files" :allow-multiple="true" />
          </div>
        </div>
      </div>
      <!-- information -->
      <div class="flex-1 h-full">
        <div class="flex w-full gap-6">
          <div class="w-[60%]">
            <p class="font-semibold mb-3">Product name:</p>
            <input
              v-model="newProduct.name"
              placeholder="Enter name..."
              class="w-full rounded-md border-[1px] border-[#ebebeb]"
              type="text"
            />
          </div>
          <div class="flex-auto">
            <p class="font-semibold mb-3">Category:</p>
            <input
              value="3fa85f64-5717-4562-b3fc-2c963f66afa6"
              class="w-full rounded-md border-[1px] border-[#ebebeb]"
              type="text"
            />
          </div>
        </div>
        <!-- description -->
        <div class="flex w-full gap-6 mt-6">
          <div class="w-full">
            <p class="font-semibold mb-3">Description:</p>
            <div class="border-[1px] min-h-[200px] rounded-md">
              <div ref="vEditor"></div>
            </div>
          </div>
        </div>
        <div class="flex-auto mt-5">
          <p class="font-semibold mb-3">Condition:</p>
          <input
            value="3fa85f64-5717-4562-b3fc-2c963f66afa6"
            class="w-full rounded-md border-[1px] border-[#ebebeb]"
            type="text"
          />
        </div>
        <!-- image by type -->
        <ImageByTypePicker v-model="newProduct.types" />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style scoped>
:deep(.ql-toolbar.ql-snow) {
  border: none !important;
  border-bottom: 1px solid #ebebeb !important;
  border-radius: 0 !important;
}
:deep(.ql-container.ql-snow) {
  border: none !important;
}
</style>
