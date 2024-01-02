<script setup>
import { ref, onMounted, onBeforeMount, onBeforeUnmount, computed } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import Quill from 'quill'
import '@/assets/css/quill.snow.css'
// components
import ImageByTypePicker from '@/components/products/CreatorModules/ImageByTypePicker.vue'
import AFilePond from '@/components/commons/atoms/AFilePond.vue'
import AFullLoading from '@/components/commons/atoms/AFullLoading.vue'
import AInput from '@/components/commons/atoms/AInput.vue'
import ADropdown from '@/components/commons/atoms/ADropdown.vue'
import ListProductImg from '@/components/products/ListProductImg.vue'
// stores
import { useMasterStore } from '@/stores/master.store'
const masterStore = useMasterStore().state
import { useRoute } from 'vue-router'
const route = useRoute()
// services
import { uploadApi, updateProductApi, getProductApi } from '@/services/product.service'
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

onBeforeUnmount(async () => {
  editor.value = null
})

onBeforeMount(async () => {
  await getDetail()
})
const subCategory = computed(() => {
  return (
    masterStore.categories.find((category) => category.id === productInformation.value.parentCategory)?.subCategories ||
    []
  )
})
onMounted(() => {
  console.log('editor', editor.value)
  editor.value = new Quill(vEditor.value, {
    theme: 'snow',
    placeholder: 'Write description...',
  })
})

const getDetail = async () => {
  const res = await getProductApi(route.params.id)
  console.log('res', res)
  productInformation.value = res.data
  editor.value.root.innerHTML = productInformation.value.description
  productInformation.value.parentCategory = masterStore.categories.find((category) =>
    category.subCategories.find((sub) => sub.id === productInformation.value.categoryId)
  )?.id
  console.log('productInformation', productInformation.value.parentCategory, productInformation.value.categoryId)
}
const onCreate = async () => {
  productInformation.value.description = editor.value.root.innerHTML
  console.log('productInformation', productInformation.value, files.value)
  isCreating.value = true
  // upload images
  if (files.value.length > 0) {
    await Promise.all(
      files.value.map(async (file) => {
        try {
          const res = await uploadImage(file.file)
          productInformation.value.images.push({
            url: res.data.urls[0],
          })
          totalImageUploaded.value.success++
        } catch (error) {
          totalImageUploaded.value.error++
        }
      })
    )
  }
  // update product
  updateProductApi(productInformation.value.id, productInformation.value)
    .then((res) => {
      console.log(res)
      isCreating.value = false
    })
    .catch((err) => {
      console.log(err)
      isCreating.value = false
    })
}

const productInformation = ref({
  name: '',
  description: '',
  categoryId: '',
  condition: '',
  types: [],
  images: [],
  parentCategory: '',
})

const uploadImage = async (file) => {
  if (file) {
    const formData = new FormData()
    formData.append('images', file)
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
  <div class="max-lg:p-5 max-md:pt-10 relative flex flex-col w-full h-fit p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="max-md:flex-col flex gap-2 justify-between w-full border-b-2 pb-5">
      <div>
        <h1 class="text-2xl font-semibold">Update product</h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="flex gap-2">
        <AButton title="Cancel" type="cancel" class="w-fit h-fit py-2 px-3" @click="onCreate">
          <template #left>
            <i class="ri-close-line"></i>
          </template>
        </AButton>
        <AButton title="Update" class="w-fit h-fit py-2 px-3 text-white bg-blue-500" @click="onCreate">
          <template #left>
            <i class="ri-save-line"></i>
          </template>
        </AButton>
      </div>
    </header>
    <!-- body -->
    <div class="max-lg:flex-col flex w-full mt-5 gap-10 h-min">
      <!-- information -->
      <div class="max-md:px-4 flex-1 h-full bg-white p-7 border-[1px] rounded-2xl">
        <p class="text-lg font-medium mb-2">
          Basic information
          <span>
            <!-- icon -->
            <i class="ri-information-line"></i>
          </span>
        </p>
        <div class="flex flex-col w-full gap-6">
          <div class="w-full">
            <AInput
              v-model="productInformation.name"
              is-required="true"
              label="Product name"
              placeholder="Enter name..."
            />
          </div>
          <div class="max-lg:flex-wrap flex gap-2">
            <ADropdown
              v-if="productInformation.parentCategory"
              v-model="productInformation.parentCategory"
              class="w-full h-full"
              is-required="true"
              label="Category"
              :options="masterStore.categories"
              placeholder="Select category..."
              required
            />
            <ADropdown
              v-if="productInformation.categoryId"
              v-model="productInformation.categoryId"
              class="w-full h-full"
              is-required="true"
              label="Subcategory"
              :options="subCategory"
              placeholder="Select subcategory..."
              required
            />
            <ADropdown
              v-if="productInformation.condition"
              v-model="productInformation.condition"
              class="w-full h-full"
              is-required="true"
              label="Condition"
              :options="[
                { name: 'New', id: 'New' },
                { name: 'Like new', id: 'Likenew' },
              ]"
              placeholder="Select condition..."
              required
            />
          </div>
        </div>
        <!-- description -->
        <div class="flex w-full gap-6 mt-6">
          <div class="w-full">
            <p class="font-medium text-base text-gray-700 mb-3">Description:</p>
            <div class="border-[2px] min-h-[200px] rounded-md">
              <div ref="vEditor"></div>
            </div>
          </div>
        </div>
        <!-- image by type -->
        <ImageByTypePicker v-if="productInformation.types?.length > 0" v-model="productInformation.types" />
      </div>
      <!-- end upload -->
      <!-- image upload -->
      <div class="flex-1 bg-white p-3 rounded-xl border-[1px]">
        <div class="min-h-[715px] h-full overflow-y-auto p-5 shadow-sm">
          <p class="text-lg font-medium">Image upload</p>
          <div class="w-full h-[500px] mt-2">
            <AFilePond v-model="files" :allow-multiple="true" />
            <ListProductImg v-model="productInformation.images" :images="productInformation.images" />
          </div>
        </div>
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
