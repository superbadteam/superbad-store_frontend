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
import AInput from '@/components/commons/atoms/AInput.vue'
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
        newProduct.value.images.push({
          url: res.data.data,
        })
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
  <div class="relative flex flex-col w-full h-fit p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <!-- <div class="absolute backdrop-blur w-full h-full flex justify-center top-0 left-0 z-10 pt-14">
      <div class="p-7 h-fit bg-white gb-shadow rounded-3xl flex flex-col justify-center items-center">
        <p class="text-lg font-semibold">Please confirm your email to create product</p>
        <p class="text-sm text-secondary">We have sent you an email to confirm your email</p>
        <p class="text-sm text-secondary">If you don't see the email, please check your spam folder</p>
        <p class="text-sm text-secondary">If you still don't see the email, please contact us</p>
        <AButton title="Resend email" class="mt-5 w-fit text-white bg-blue-500">
          <template #left>
            <i class="ri-mail-send-line mr-2"></i>
          </template>
        </AButton>
      </div>
    </div> -->
    <!-- header -->
    <header class="flex gap-2 justify-between w-full border-b-2 pb-5">
      <div>
        <h1 class="text-2xl font-semibold">Create new product</h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="flex gap-2">
        <AButton title="Cancel" class="w-fit h-fit py-2 px-3 bg-slate-200 text-secondary" @click="onCreate">
          <template #left>
            <i class="ri-close-line"></i>
          </template>
        </AButton>
        <AButton title="Create" class="w-fit h-fit py-2 px-3 text-white bg-blue-500" @click="onCreate">
          <template #left>
            <i class="ri-save-line"></i>
          </template>
        </AButton>
      </div>
    </header>
    <!-- body -->
    <div class="flex w-full mt-5 gap-10 h-min">
      <!-- information -->
      <div class="flex-1 h-full bg-white p-7 rounded-2xl">
        <p class="text-lg font-medium mb-2">
          Basic information
          <span>
            <!-- icon -->
            <i class="ri-information-line"></i>
          </span>
        </p>
        <div class="flex flex-col w-full gap-6">
          <div class="w-full">
            <AInput v-model="newProduct.name" is-required="true" label="Product name" placeholder="Enter name..." />
          </div>
          <div class="flex gap-2">
            <AInput v-model="newProduct.category" is-required="true" label="Category" placeholder="Enter category..." />
            <AInput
              v-model="newProduct.condition"
              is-required="true"
              label="Condition"
              placeholder="Enter condition..."
            />
          </div>
        </div>
        <!-- description -->
        <div class="flex w-full gap-6 mt-6">
          <div class="w-full">
            <p class="font-medium text-base text-[#606570] mb-3">Description:</p>
            <div class="border-[2px] min-h-[200px] rounded-md">
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
      <!-- end upload -->
      <!-- image upload -->
      <div class="flex-1 bg-white p-3 rounded-xl">
        <div class="min-h-[715px] h-full overflow-y-auto p-5 shadow-sm">
          <p class="text-lg font-medium">Image upload</p>
          <div class="w-full h-[500px] mt-2">
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
