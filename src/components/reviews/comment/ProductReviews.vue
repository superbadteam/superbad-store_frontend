<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold">Product Reviews</h2>
    <div v-if="loading && !reviews.length" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
    <div v-else-if="reviews.length === 0" class="text-center text-gray-500">
      No reviews yet
    </div>
    <div v-else class="flex gap-8">
      <!-- Rating Summary - 20% -->
      <div class="w-1/5">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-center">
            <div class="text-4xl font-bold text-primary-600">{{ averageRating }}</div>
            <div class="flex justify-center gap-1 mt-2">
              <i
                v-for="star in 5"
                :key="star"
                :class="[
                  'ri-star-fill',
                  star <= Math.round(averageRating) ? 'text-yellow-500' : 'text-gray-300'
                ]"
              ></i>
            </div>
            <p class="text-gray-600 mt-2">{{ totalReviews }} reviews</p>
          </div>
        </div>
      </div>

      <!-- Reviews List - 80% -->
      <div class="w-4/5 space-y-4">
        <div v-for="review in reviews" :key="review.id" class="flex gap-3">
          <div>
            <LazyImg
              class-style="w-[50px] min-w-[50px] h-[50px] rounded-full object-cover"
              :src="review.reviewer.avatarUrl || 'https://picsum.photos/200/300'"
            />
          </div>
          <div class="flex-auto flex-col">
            <div class="flex justify-between">
              <p class="font-semibold">{{ review.reviewer.name }}</p>
              <p class="text-gray-400">{{ formatDate(review.createdAt) }}</p>
            </div>
            <div class="flex items-center gap-1">
              <i
                v-for="star in 5"
                :key="star"
                :class="[
                  'ri-star-fill',
                  star <= review.rating ? 'text-yellow-500' : 'text-gray-300'
                ]"
              ></i>
              <span class="text-gray-400">({{ review.rating }}/5)</span>
            </div>
            <p class="mt-2">{{ review.content }}</p>
          </div>
        </div>
        <div v-if="hasMore" class="flex justify-center mt-4">
          <button
            @click="loadMore"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :disabled="loading"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Show More</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProductReviews } from '@/services/review.service'
import LazyImg from '@/components/commons/atoms/LazyImg.vue'

const props = defineProps({
  productRating: {
    type: Number,
    default: 0
  }
})

const route = useRoute()
const reviews = ref([])
const loading = ref(false)
const pageIndex = ref(1)
const pageSize = 10
const hasMore = ref(true)
const totalReviews = ref(0)


const averageRating = computed(() => {
  if (reviews.value.length === 0) return props.productRating
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return (sum / reviews.value.length).toFixed(1)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) {
    return 'Today'
  } else if (diffDays === 1) {
    return 'Yesterday'
  } else if (diffDays < 7) {
    return `${diffDays} days ago`
  } else {
    return date.toLocaleDateString()
  }
}

const fetchReviews = async (isLoadMore = false) => {
  if (loading.value) return
  
  loading.value = true
  try {
    const productId = route.params.id
    const response = await getProductReviews(productId, {
      PageIndex: pageIndex.value,
      PageSize: pageSize
    })
    totalReviews.value = response.data.meta.totalCount

    if (isLoadMore) {
      reviews.value = [...reviews.value, ...response.data.data]
    } else {
      reviews.value = response.data.data
    }
    
    hasMore.value = response.data.data.length === pageSize
  } catch (error) {
    console.error('Error fetching reviews:', error)
  } finally {
    loading.value = false
  }
}

const loadMore = () => {
  pageIndex.value++
  fetchReviews(true)
}

onMounted(() => {
  fetchReviews()
})
</script> 