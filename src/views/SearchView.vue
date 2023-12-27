<template>
  <div class="w-full flex flex-col items-center">
    <div class="max-md:h-[150px] w-full flex justify-center items-end p-5 pb-10 bg-third-100 h-[200px]">
      <!-- search value -->
      <div class="w-full max-w-[1440px]">
        <h1 class="text-white text-4xl font-bold">Cold Weather</h1>
        <SearchWrapper class="w-full text-white" />
      </div>
    </div>
    <div class="max-md:px-5 w-full max-w-[1440px] py-5">
      <BreadCrumb :routes="routes" class="text-base" />
    </div>
    <div class="border-b-[1px] w-full"></div>
    <!-- main -->
    <div class="max-md:flex-col w-full max-w-[1440px] mt-10 pb-10 flex gap-10 lg:px-5">
      <!-- filter -->
      <div class="max-md:w-full max-md:px-5 w-[300px] min-w-[300px]">
        <FilterBox v-model="filter" />
      </div>
      <!-- products -->
      <div class="flex-auto">
        <div class="max-md:flex-col max-md:px-5 flex justify-between items-center">
          <p class="text-lg font-bold">
            Showing {{ products.length }} results for:
            <span class="font-medium">{{ keyword }}</span>
          </p>
          <div class="flex gap-5">
            <div class="flex items-center gap-2">
              <!-- select box sort by-->
              <div class="relative">
                <select class="border-[1px] border-third-200 rounded-md px-3 py-1 text-sm font-medium text-third-200">
                  <option value="">Sort by</option>
                  <option value="CreatedAt">Created at</option>
                  <option value="Price">Price</option>
                  <option value="TotalReviews">Total reviews</option>
                  <option value="Rating">Rating</option>
                  <option value="Sold">Sold</option>
                </select>
                <i class="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2"></i>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="relative">
                <select class="border-[1px] px-5 border-third-200 rounded-md py-1 text-sm font-medium text-third-200">
                  <option value="">Accending</option>
                  <option value="true">Descending</option>
                </select>
                <i class="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:px-2 flex flex-wrap gap-5 mt-5">
          <router-link
            v-for="product in products"
            :key="product.name"
            class="max-md:w-full"
            :to="`/products/${product.id}`"
          >
            <ProductCard :product="product" class="max-md:w-full" />
          </router-link>
        </div>
        <div class="mt-5">
          <v-pagination
            v-model="meta.pageIndex"
            :pages="meta.totalPages"
            :range-size="1"
            active-color="#DCEDFF"
            @update:model-value="updateHandler"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchWrapper from '@/components/search/SearchWrapper.vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import FilterBox from '@/components/search/FilterBox.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import { onBeforeMount, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchProductsApi } from '@/services/product.service'
const route = useRoute()
const routeQuery = computed(() => route.query)

watch(routeQuery, (value) => {
  keyword.value = value.keyword
  filter.value.category = value.category
  handleRoute()
})

onBeforeMount(() => {
  console.log('search')
  filter.value.category = routeQuery.value.category
  keyword.value = routeQuery.value.keyword
  handleRoute()
})

const keyword = ref('')
const filter = ref({
  category: [],
  subcategory: '',
})

const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Search',
    path: '/search',
  },
  {
    name: 'Cold Weather',
    path: '/search',
  },
])

const products = ref([
  {
    name: 'Long Product Name 1 You Might Forget the BeginningYou Might Forget the Beginning',
    cost: 29.99,
    imageUrl:
      'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 5,
    location: 'Location 1',
    star: 4.2,
    sold: 50,
  },
  {
    name: 'Very Long Product Name 2 with Many Words',
    cost: 39.99,
    imageUrl:
      'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 10,
    location: 'Location 2',
    star: 4.5,
    sold: 75,
  },
  {
    name: 'Product 3 with a Long Name That Goes On and On',
    cost: 49.99,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1677234148135-2bb4f10f6332?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 0,
    location: 'Location 3',
    star: 3.8,
    sold: 30,
  },
  {
    name: 'A Really Long Product Name 4 for Your Consideration',
    cost: 19.99,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1677451335829-c863209d463b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 8,
    location: 'Location 4',
    star: 4.0,
    sold: 40,
  },
  {
    name: "Product 5 with an Extremely Long Name that Doesn't End",
    cost: 59.99,
    imageUrl:
      'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 15,
    location: 'Location 5',
    star: 4.7,
    sold: 60,
  },
  {
    name: 'Product 6 with a Name So Long It Might Wrap to the Next Line',
    cost: 69.99,
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1678218575597-5d0a2810825f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 12,
    location: 'Location 6',
    star: 4.3,
    sold: 90,
  },
  {
    name: 'Product 7 with a Name Long Enough to Fill the Space Provided',
    cost: 24.99,
    imageUrl:
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discount: 3,
    location: 'Location 7',
    star: 4.1,
    sold: 25,
  },
  {
    name: 'Product 8 with a Really, Really Long Name That Keeps Going',
    cost: 79.99,
    imageUrl: 'https://via.placeholder.com/150',
    discount: 20,
    location: 'Location 8',
    star: 4.8,
    sold: 120,
  },
  {
    name: 'Product 9 with an Absurdly Long Name Just for Fun',
    cost: 44.99,
    imageUrl: 'https://via.placeholder.com/150',
    discount: 7,
    location: 'Location 9',
    star: 4.4,
    sold: 55,
  },
  {
    name: 'Product 10 with a Name So Long You Might Forget the Beginning',
    cost: 34.99,
    imageUrl: 'https://via.placeholder.com/150',
    discount: 9,
    location: 'Location 10',
    star: 4.6,
    sold: 80,
  },
])
const meta = ref({
  pageIndex: 1,
  totalPages: 1,
})

const searchParams = ref('')
const handleRoute = async () => {
  const { category, keyword } = routeQuery.value
  const Cate = category && Array.isArray(category) ? category.join(',') : category ? category : ''
  searchParams.value = `Category=${Cate}&Keyword=${keyword}`
  console.log('Cate', Cate)
  const res = await searchProductsApi(searchParams.value)
  console.log('data', res)
  products.value = res.data.data
}
</script>
