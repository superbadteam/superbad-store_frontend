<script setup>
import { ref, onBeforeMount,watch } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import { useAuthStore } from '@/stores/auth.store'
import VPagination from '@hennge/vue3-pagination'
import AButton from '@/components/commons/atoms/AButton.vue'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
// services
// import { getMyProductsApi } from '@/services/product.service'
const authStore = useAuthStore().state
import { useRouter } from 'vue-router'
import { getMeReviews, getReviewables } from '@/services/review.service'
const router = useRouter()
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'My order',
    path: '/dashboard/manage-product',
  },
])

const userData = ref(null)
onBeforeMount(async () => {
  console.log('authStore', authStore)
  userData.value = { ...authStore?.user }
  await fetchMeReviews()
})

const reviews = ref([])
const meta = ref({
  pageIndex: 1,
  totalPages: 1,
})

const fetchMeReviews = async (pageIndex = 1) => {
  // const res = await getMyProductsApi()
  try {
    const res = await getMeReviews({pageIndex})
  
  reviews.value = res.data.data
  meta.value = res.data.meta
  console.log('reviews', reviews.value)
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}

watch(() => meta.value.pageIndex, (newPageIndex) => {
  fetchMeReviews(newPageIndex)
})

</script>

<template>
  <div class="relative flex flex-col w-full h-full p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="flex justify-between w-full gap-2 pb-5">
      <div>
        <h1 class="text-2xl font-semibold">
          My Review
        </h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="sticky top-0 flex gap-2" />
    </header>

    <div class="flex w-full gap-5">
      <div class="relative w-full overflow-x-auto border rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right">
          <thead class="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th
                scope="col"
                class="px-6 py-3"
              >
                Product name
              </th>
              <!-- <th scope="col" class="px-6 py-3">Sold</th> -->
          

              <th
               
                scope="col"
                class="px-6 py-3"
              >
                Review
              </th>

              <th
               
                scope="col"
                class="px-6 py-3"
              >
                Score
              </th>

              <!-- created at -->
              <th
               
                scope="col"
                class="px-6 py-3"
              >
                Created at
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in reviews"
              :key="product.id"
              class="bg-white border-b"
            >
              <th
                scope="row"
                class="max-w-[300px] px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <RouterLink
                  :to="`/products/${product.productId || product.product.id}`"
                  class="flex items-center gap-2"
                >
                  <LazyImg
                    :src="product.imageUrl ||product.product.imageUrl "
                    alt=""
                    class-style="w-10 h-10 rounded-lg mr-4 object-cover"
                  />
                  <div class="truncate max-w-[100px]">
                    {{ product.productName || product?.product?.name }}
                  </div>
                </RouterLink>
              </th>
              <td class="px-6 py-4">
                {{ product.content }}
              </td>
               <td class="px-6 py-4">
                {{ product.rating }}
              </td>
              <td class="px-6 py-4">
                {{ new Date(product.createdAt).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="py-5">
          <v-pagination
            v-model="meta.pageIndex"
            :pages="meta.totalPages"
            :range-size="1"
            active-color="#DCEDFF"
            @update:model-value="updateHandler"
          />
        </div>
  </div>
</template>
