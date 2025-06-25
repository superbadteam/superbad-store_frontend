<script setup>
import { ref, onBeforeMount } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import AButton from '@/components/commons/atoms/AButton.vue'
import '@/assets/css/quill.snow.css'
import { toast } from 'vue3-toastify'
// components
import AInput from '@/components/commons/atoms/AInput.vue'
// stores
import { useMasterStore } from '@/stores/master.store'
const masterStore = useMasterStore().state
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
// services
import { getProductApi } from '@/services/product.service'
import { postReview } from '@/services/review.service'
import AFullLoading from '@/components/commons/atoms/AFullLoading.vue'
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Review product',
    path: '/review-product',
  },
])

onBeforeMount(async () => {
  await getDetail()
})

const getDetail = async () => {
  const res = await getProductApi(route.params.id)
  console.log('res', res)
  productInformation.value = res.data
  productInformation.value.parentCategory = masterStore.categories.find((category) =>
    category.subCategories.find((sub) => sub.id === productInformation.value.categoryId)
  )?.id
  console.log('productInformation', productInformation.value.parentCategory, productInformation.value.categoryId)
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

const selectedStar = ref(0)
const isLoading = ref(false)
const onCreate = async () => {
  console.log('onCreate', productInformation.value)
  // Here you would typically send the review to your backend
  // For example:
  // await createReviewApi(productInformation.value)
  // After successful submission, you might want to reset the form or redirect
  // alert('Review submitted successfully!')
  isLoading.value = true
  try {
    await postReview(route.query.orderId,{
      rating: selectedStar.value,
      content: content.value,
    })
      toast.success('Register success!')
    router.push('/dashboard/ordered-product')
  } catch (error) {
    console.error('Error submitting review:', error)
    toast.error('Failed to submit review. Please try again.')
  } finally {
    isLoading.value = false
    
  }
}
const content = ref('')
</script>
<template>
  <div class="max-lg:p-5 max-md:pt-10 relative flex flex-col w-full h-fit p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="flex justify-between w-full gap-2 pb-5 border-b-2 max-md:flex-col">
      <div>
        <h1 class="text-2xl font-semibold">
          Review product
        </h1>
        <BreadCrumb :routes="routes" />
      </div>
    </header>
    <!-- body -->
    <div class="flex w-full gap-10 mt-5 max-lg:flex-col h-min">
      <!-- information -->
      <div class="max-md:px-4 flex-1 h-full bg-white p-7 border-[1px] rounded-2xl">
        <p class="mb-2 text-lg font-medium">
          REVIEW
          <span>
            <!-- icon -->
            <i class="ri-information-line" />
          </span>
        </p>

        <div
          v-if="productInformation?.name"
          class="flex justify-between gap-4 p-2 rounded-md cursor-pointer hover:bg-slate-100"
        >
          <div class="w-[50px] min-w-[50px] h-[50px] rounded-md">
            <img
              class="object-cover w-full h-full rounded-md"
              :src="productInformation.images[0].url"
              alt=""
            >
          </div>
          <div class="flex flex-auto flex-col w-[30%]">
            <p class="font-medium truncate max-w-[400px]">
              {{ productInformation.name }}
            </p>
            <p>
              <span>{{ productInformation.types[0].quantity }}</span> items - {{ productInformation.types[0].name }}
            </p>
          </div>
          <p class="text-sm font-bold text-gray-700 whitespace-nowrap">
            ${{ productInformation.totalPrice }}
          </p>
        </div>
        <div class="flex items-center gap-1 pt-2 my-4 border-t">
          <span
            v-for="star in 5"
            :key="star"
            class="text-2xl cursor-pointer"
            :class="star <= selectedStar ? 'text-yellow-400' : 'text-gray-300'"
            @click="selectedStar = star"
          >
            <i class="ri-star-fill" />
          </span>
          <span class="ml-2 text-sm text-gray-600">({{ selectedStar }} / 5)</span>
        </div>
        <div class="flex flex-col w-full gap-6">
          <div class="w-full">
            <AInput
              is-required="true"
              name="content"
              @input="content = $event"
              label="Your review"
              placeholder="Enter your review..."
            />
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-5">
          <AButton
            title="Submit"
            class="px-3 py-2 text-white bg-blue-500 w-fit h-fit"
            @click="onCreate"
          >
            <template #left>
              <i class="ri-save-line" />
            </template>
          </AButton>
        </div>
      </div>
      <!-- end upload -->
    </div>
    <AFullLoading
      v-if="isLoading"
    />
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
