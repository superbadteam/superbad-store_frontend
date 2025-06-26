<script setup>
import { ref, onBeforeMount,computed } from 'vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import { useAuthStore } from '@/stores/auth.store'
import AButton from '@/components/commons/atoms/AButton.vue'
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
  await getMyProducts()
  await fetchMeReviews()
})

const products = ref([])
const reviews = ref([])

const fetchMeReviews = async () => {
  // const res = await getMyProductsApi()
  try {
    const res = await getMeReviews()
  
  reviews.value = res.data.data
  console.log('reviews', reviews.value)
  } catch (error) {
    console.error('Error fetching reviews:', error)
  }
}
const getMyProducts = async () => {
  const res = await getReviewables()
  products.value = res.data.data
  console.log('products', products.value)
}

const onEdit = (id, orderId) => {
  console.log('onEdit')
  router.push({
    name: 'review-product',
    params: {
      id,
    },
    query: {
      orderId,
    },
  })
}

const tab = ref('notReviewed')

const itemFiltered = computed(() => {
  if (tab.value === 'notReviewed') {
    return products.value
  } else {
    return reviews.value
  }
})
</script>

<template>
  <div class="relative flex flex-col w-full h-full p-10 bg-[#fafafa] pt-10 rounded-[8px] py-5">
    <header class="flex justify-between w-full gap-2 pb-5">
      <div>
        <h1 class="text-2xl font-semibold">
          My order
        </h1>
        <BreadCrumb :routes="routes" />
      </div>
      <div class="sticky top-0 flex gap-2" />
    </header>

    <!-- Tab Not review yet & Reviewed to filter-->
    <div class="flex gap-4 mb-6 overflow-hidden bg-gray-100 border rounded-lg shadow-lg min-h-10 w-fit">
      <button
        class="h-10 px-4 py-2 rounded focus:outline-none min-h-10"
        :class="tab === 'notReviewed' ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-700'"
        @click="tab = 'notReviewed'"
      >
        Not reviewed yet
      </button>
      <button
        class="h-10 px-4 py-2 rounded focus:outline-none min-h-10"
        :class="tab === 'reviewed' ? 'bg-gray-400 text-white' : 'bg-gray-100 text-gray-700'"
        @click="tab = 'reviewed'"
      >
        Reviewed
      </button>
    </div>
    
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
                v-if="tab === 'notReviewed'"
                scope="col"
                class="px-6 py-3"
              >
                Type
              </th>
              <th
                v-if="tab === 'notReviewed'"
                scope="col"
                class="px-6 py-3"
              >
                Price
              </th>
              <th
                v-if="tab === 'notReviewed'"
                scope="col"
                class="px-6 py-3"
              >
                Action
              </th>

              <th
                v-if="tab === 'reviewed'"
                scope="col"
                class="px-6 py-3"
              >
                Review
              </th>

              <th
                v-if="tab === 'reviewed'"
                scope="col"
                class="px-6 py-3"
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in itemFiltered"
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
              <td class="px-6 py-4" v-if="tab === 'reviewed'">
                {{ product.content }}
              </td>
               <td class="px-6 py-4" v-if="tab === 'reviewed'">
                {{ product.rating }}
              </td>
              <td class="px-6 py-4" v-if="tab === 'notReviewed'">
                {{ product.typeName }}
              </td>
              <td class="px-6 py-4" v-if="tab === 'notReviewed'">
                ${{ product.totalPrice }}
              </td>
              <td class="px-6 py-4" v-if="tab === 'notReviewed'">
                <div class="flex gap-2">
                  <AButton
                    title="Review"
                    type="edit"
                    class="px-3 py-2 w-fit h-fit"
                    @click="onEdit(product.productId, product.id)"
                  >
                    <template #left>
                      <i class="mr-2 ri-pencil-line" />
                    </template>
                  </AButton>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
