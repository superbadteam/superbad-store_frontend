<script setup>
import { ref, onBeforeMount } from 'vue'
import { getOurProductsApi } from '@/services/product.service'
import ProductItem from './ProductItem.vue'

// const products = ref([])
const currentPage = ref(1)
const pageSize = 40
const isLoading = ref(false)
const hasMore = ref(true)

const products = ref([
  {
    id: '3608dd0d-1a91-4583-8f01-c0af6048bb4e',
    name: 'Product 1',
    minPrice: 100,
    maxPrice: 150,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    sold: 100,
  },
  {
    id: '4608dd0d-1a91-4583-8f01-c0af6048bb4f',
    name: 'Product 2',
    minPrice: 200,
    maxPrice: 250,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.2,
    sold: 85,
  },
  {
    id: '5608dd0d-1a91-4583-8f01-c0af6048bb50',
    name: 'Product 3',
    minPrice: 150,
    maxPrice: 180,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    sold: 120,
  },
  {
    id: '6608dd0d-1a91-4583-8f01-c0af6048bb51',
    name: 'Product 4',
    minPrice: 300,
    maxPrice: 350,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.0,
    sold: 65,
  },
  {
    id: '7608dd0d-1a91-4583-8f01-c0af6048bb52',
    name: 'Product 5',
    minPrice: 180,
    maxPrice: 220,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 150,
  },
  {
    id: '8608dd0d-1a91-4583-8f01-c0af6048bb53',
    name: 'Product 6',
    minPrice: 250,
    maxPrice: 280,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.3,
    sold: 95,
  },
  {
    id: '9608dd0d-1a91-4583-8f01-c0af6048bb54',
    name: 'Product 7',
    minPrice: 120,
    maxPrice: 160,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
    sold: 110,
  },
  {
    id: 'a608dd0d-1a91-4583-8f01-c0af6048bb55',
    name: 'Product 8',
    minPrice: 350,
    maxPrice: 400,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.1,
    sold: 75,
  },
  {
    id: 'b608dd0d-1a91-4583-8f01-c0af6048bb56',
    name: 'Product 9',
    minPrice: 220,
    maxPrice: 260,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.4,
    sold: 88,
  },
  {
    id: 'c608dd0d-1a91-4583-8f01-c0af6048bb57',
    name: 'Product 10',
    minPrice: 280,
    maxPrice: 320,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.9,
    sold: 180,
  },
  {
    id: 'd608dd0d-1a91-4583-8f01-c0af6048bb58',
    name: 'Product 11',
    minPrice: 160,
    maxPrice: 190,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.2,
    sold: 70,
  },
  {
    id: 'e608dd0d-1a91-4583-8f01-c0af6048bb59',
    name: 'Product 12',
    minPrice: 400,
    maxPrice: 450,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    sold: 130,
  },
  {
    id: 'f608dd0d-1a91-4583-8f01-c0af6048bb60',
    name: 'Product 13',
    minPrice: 190,
    maxPrice: 230,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    sold: 105,
  },
  {
    id: 'g608dd0d-1a91-4583-8f01-c0af6048bb61',
    name: 'Product 14',
    minPrice: 320,
    maxPrice: 360,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.3,
    sold: 90,
  },
  {
    id: 'h608dd0d-1a91-4583-8f01-c0af6048bb62',
    name: 'Product 15',
    minPrice: 240,
    maxPrice: 270,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 160,
  },
  {
    id: 'i608dd0d-1a91-4583-8f01-c0af6048bb63',
    name: 'Product 16',
    minPrice: 270,
    maxPrice: 300,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
    sold: 140,
  },
  {
    id: 'j608dd0d-1a91-4583-8f01-c0af6048bb64',
    name: 'Product 17',
    minPrice: 290,
    maxPrice: 320,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.4,
    sold: 120,
  },
  {
    id: 'k608dd0d-1a91-4583-8f01-c0af6048bb65',
    name: 'Product 18',
    minPrice: 310,
    maxPrice: 340,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    sold: 150,
  },
  {
    id: 'l608dd0d-1a91-4583-8f01-c0af6048bb66',
    name: 'Product 19',
    minPrice: 330,
    maxPrice: 360,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    sold: 130,
  },
  {
    id: 'm608dd0d-1a91-4583-8f01-c0af6048bb67',
    name: 'Product 20',
    minPrice: 350,
    maxPrice: 380,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 170,
  },
  {
    id: 'n608dd0d-1a91-4583-8f01-c0af6048bb68',
    name: 'Product 21',
    minPrice: 370,
    maxPrice: 400,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.3,
    sold: 110,
  },
  {
    id: 'o608dd0d-1a91-4583-8f01-c0af6048bb69',
    name: 'Product 22',
    minPrice: 390,
    maxPrice: 420,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
    sold: 140,
  },
  {
    id: 'p608dd0d-1a91-4583-8f01-c0af6048bb70',
    name: 'Product 23',
    minPrice: 410,
    maxPrice: 440,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.4,
    sold: 125,
  },
  {
    id: 'q608dd0d-1a91-4583-8f01-c0af6048bb71',
    name: 'Product 24',
    minPrice: 430,
    maxPrice: 460,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    sold: 155,
  },
  {
    id: 'r608dd0d-1a91-4583-8f01-c0af6048bb72',
    name: 'Product 25',
    minPrice: 450,
    maxPrice: 480,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    sold: 135,
  },
  {
    id: 's608dd0d-1a91-4583-8f01-c0af6048bb73',
    name: 'Product 26',
    minPrice: 470,
    maxPrice: 500,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 175,
  },
  {
    id: 't608dd0d-1a91-4583-8f01-c0af6048bb74',
    name: 'Product 27',
    minPrice: 490,
    maxPrice: 520,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.3,
    sold: 115,
  },
  {
    id: 'u608dd0d-1a91-4583-8f01-c0af6048bb75',
    name: 'Product 28',
    minPrice: 510,
    maxPrice: 540,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
    sold: 145,
  },
  {
    id: 'v608dd0d-1a91-4583-8f01-c0af6048bb76',
    name: 'Product 29',
    minPrice: 530,
    maxPrice: 560,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.4,
    sold: 128,
  },
  {
    id: 'w608dd0d-1a91-4583-8f01-c0af6048bb77',
    name: 'Product 30',
    minPrice: 550,
    maxPrice: 580,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    sold: 158,
  },
  {
    id: 'x608dd0d-1a91-4583-8f01-c0af6048bb78',
    name: 'Product 31',
    minPrice: 570,
    maxPrice: 600,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    sold: 138,
  },
  {
    id: 'y608dd0d-1a91-4583-8f01-c0af6048bb79',
    name: 'Product 32',
    minPrice: 590,
    maxPrice: 620,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 178,
  },
  {
    id: 'z608dd0d-1a91-4583-8f01-c0af6048bb80',
    name: 'Product 33',
    minPrice: 610,
    maxPrice: 640,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.3,
    sold: 118,
  },
  {
    id: 'a708dd0d-1a91-4583-8f01-c0af6048bb81',
    name: 'Product 34',
    minPrice: 630,
    maxPrice: 660,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.6,
    sold: 148,
  },
  {
    id: 'b708dd0d-1a91-4583-8f01-c0af6048bb82',
    name: 'Product 35',
    minPrice: 650,
    maxPrice: 680,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.4,
    sold: 132,
  },
  {
    id: 'c708dd0d-1a91-4583-8f01-c0af6048bb83',
    name: 'Product 36',
    minPrice: 670,
    maxPrice: 700,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.7,
    sold: 162,
  },
  {
    id: 'd708dd0d-1a91-4583-8f01-c0af6048bb84',
    name: 'Product 37',
    minPrice: 690,
    maxPrice: 720,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.5,
    sold: 142,
  },
  {
    id: 'e708dd0d-1a91-4583-8f01-c0af6048bb85',
    name: 'Product 38',
    minPrice: 710,
    maxPrice: 740,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 182,
  },
  {
    id: 'f708dd0d-1a91-4583-8f01-c0af6048bb86',
    name: 'Product 39',
    minPrice: 730,
    maxPrice: 760,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.3,
    sold: 122,
  },
  {
    id: 'g708dd0d-1a91-4583-8f01-c0af6048bb87',
    name: 'Product 40',
    minPrice: 750,
    maxPrice: 780,
    imageUrl: 'https://via.placeholder.com/150',
    rating: 4.8,
    sold: 188,
  },
])

const loadProducts = async (page) => {
  try {
    isLoading.value = true
    const params = {
      PageIndex: page,
      PageSize: pageSize
    }
    const res = await getOurProductsApi(params)
    if (page === 1) {
      products.value = res.data.data
    } else {
      products.value = [...products.value, ...res.data.data]
    }
    hasMore.value = res.data.data.length === pageSize
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const showMore = async () => {
  if (isLoading.value || !hasMore.value) return
  currentPage.value++
  await loadProducts(currentPage.value)
}

const showLess = () => {
  currentPage.value = 1
  loadProducts(1)
}

onBeforeMount(async () => {
  await loadProducts(1)
})
</script>

<template>
  <div class="w-full h-fit bg-[#f9f9f9] rounded-md">
    <!-- title section -->
    <div class="w-full flex justify-between p-4">
      <div class="flex">
        <h2 class="text-xl font-bold">Our Product</h2>
      </div>
    </div>

    <!-- products grid -->
    <div class="w-full p-4">
      <div class="grid grid-cols-4 gap-4">
        <RouterLink 
          v-for="product in products" 
          :key="product.id" 
          :to="`/products/${product.id}`"
          class="w-full"
        >
          <ProductItem :product="product" />
        </RouterLink>
      </div>

      <div v-if="isLoading" class="w-full flex justify-center mt-6">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>

      <div class="w-full flex justify-center gap-4 mt-6">
        <button 
          v-if="hasMore && !isLoading"
          @click="showMore"
          class="flex items-center gap-2 px-6 py-2 bg-primary-600 text-black rounded-full shadow-md hover:bg-primary-700 transition-all duration-300 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>See more</span>
        </button>

        <button 
          v-if="currentPage > 1"
          @click="showLess"
          class="flex items-center gap-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-full shadow-md hover:bg-gray-300 transition-all duration-300 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
          </svg>
          <span>See less</span>
        </button>
      </div>
    </div>
  </div>
</template>
