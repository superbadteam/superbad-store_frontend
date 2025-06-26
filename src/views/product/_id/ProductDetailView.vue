<template>
  <div class="flex justify-center w-full gap-5 px-5 pt-7">
    <div class="flex w-full flex-col gap-5 max-w-[1200px] max-[1254px]:w-full h-fit rounded-[8px] justify-center py-5">
      <div class="w-full">
        <BreadCrumb :routes="routes" />
      </div>
      <!-- detail -->
      <div class="flex w-full gap-10 max-md:flex-col">
        <!-- thumbnail -->
        <ThumbnailsProduct
          :current-type="typeSelected"
          :product="product"
        />
        <div class="flex-auto">
          <h1 class="mb-2 text-xl font-bold">
            {{ product.name }}
          </h1>
          <span class="text-primary-200">
            <i class="ri-star-fill text-[#ffaa28]" />
            <span class="ml-2 mr-1">4.5</span>
            <span>|</span>
            <span class="ml-1">sold {{ product.sold }}</span>
          </span>
          <div class="mt-3 text-xl font-semibold">
            <span v-if="priceComputed.price">
              {{ '$' + priceComputed.price }}
            </span>
            <span v-else>
              {{ '$' + priceComputed.min + '- $' + priceComputed.max }}
            </span>
          </div>
          <div class="border-b-[1px] pb-4" />
          <div class="mt-4">
            <p class="text-lg font-medium text-gray-800">
              Type: <span class="text-base font-light">{{ typeSelected?.name }}</span>
            </p>
            <div class="flex gap-2 mt-2">
              <div
                v-for="productType in product.types"
                :key="productType.id"
                :class="{ 'bg-primary-300': typeSelected === productType }"
                class="flex px-4 py-1 border-[1px] rounded-md cursor-pointer hover:bg-primary-300"
                @click="chooseType(productType)"
              >
                {{ productType.name }}
              </div>
            </div>
          </div>
          <!-- detail -->
          <div class="border-b-[1px] pb-4" />
          <p class="mt-4 text-lg font-medium text-gray-800">
            Details
          </p>
          <div class="whitespace-pre-line">
            {{ displayedDescription }}
            <div
              v-if="hasMoreDescription"
              class="mt-4"
            >
              <button 
                class="border-[1px] border-primary-600 rounded-md px-2 py-1 flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                @click="showFullDescription = !showFullDescription"
              >
                <span>{{ showFullDescription ? 'Show less' : 'Show more' }}</span>
                <i
                  :class="[
                    'ri-arrow-' + (showFullDescription ? 'up' : 'down') + '-s-line',
                    'transition-transform duration-300'
                  ]"
                />
              </button>
            </div>
          </div>
        </div>
        <!-- add to card -->
        <div class="max-md:w-full min-w-[300px] w-[300px] h-fit p-5 border-[1px] rounded-lg">
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-3">
              <img
                class="h-[40px] w-[40px] rounded-md"
                :src="typeSelected?.imageUrl ?? product.images[0]?.url"
                alt=""
              >
              <p>(choose type)</p>
            </div>
            <p>
              <span class="font-bold">{{ typeSelected?.quantity }}</span> In stock
            </p>
          </div>
          <div class="border-b-[1px] pb-4" />
          <div class="flex items-center justify-between mt-4">
            <p>Quantity</p>
            <ANumberInput
              v-model="cart.quantity"
              :max="typeSelected?.quantity"
            />
          </div>
          <div class="flex items-center justify-between mt-4">
            <p>Sub total</p>
            <p class="text-lg font-bold">
              ${{ typeSelected?.price ? typeSelected?.price * cart.quantity : 0 }}
            </p>
          </div>
          <p class="text-rose-500">
            {{ errValidate?.cart }}
          </p>
          <div
            class="cursor-pointer text-third-100 border-third-100 border-[2px] py-2 flex gap-3 justify-center rounded-md mt-5"
            @click="addToCart"
          >
            <i class="ri-shopping-cart-2-line" /> Add to cart
          </div>
          <div
            class="flex justify-center gap-3 py-3 mt-4 text-white rounded-md cursor-pointer bg-third-100"
            @click="buyNow"
          >
            Buy now
          </div>
          <div class="flex items-center justify-center gap-5 mt-4 font-medium">
            <p><i class="ri-heart-line" /> Wish list</p>
            <div class="w-[1px] h-7 bg-slate-200" />
            <p><i class="ri-share-line" /> Share</p>
          </div>
        </div>
      </div>
      <!-- end detail -->
      <!-- detail shop -->
      <div class="w-full">
        <div class="border-b-[1px] pb-4" />
        <ShopDetail :shop="shopDetail" />
        <div class="border-b-[1px] pb-4" />
      </div>

      <!-- san pham tuong tu -->
        <p class="mb-4 text-xl font-medium">Products you may like</p>
      <div class="flex w-full gap-3 py-2 overflow-x-auto">
        <a 
          v-for="item in productsRecommend" 
          :key="item.id" 
          :href="`/products/${item.id}`"
          class="w-full"
        >
          <ProductItem class="border" :product="item" />
           <!-- {{ item }} -->
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, computed } from 'vue'
// components
import ANumberInput from '@/components/commons/atoms/ANumberInput.vue'
import BreadCrumb from '@/components/commons/BreadCrumb.vue'
import ThumbnailsProduct from '@/components/products/ThumbnailsProduct.vue'
import ShopDetail from '@/components/profiles/ShopDetail.vue'
// import ReviewContainer from '@/components/reviews/index.vue'
// services
import { getProductApi, getRecommendedProductsByProductId } from '@/services/product.service'
import { addToCartApi } from '@/services/cart.service'
import { toast } from 'vue3-toastify'
// stores
import { useMasterStore } from '@/stores/master.store'
const masterStore = useMasterStore()
import { usePopupStore } from '@/stores/common.store'
const popupStore = usePopupStore()
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
import { useUserStore } from '@/stores/user.store'

// comments 
import ProductReviews from '@/components/reviews/comment/ProductReviews.vue'
import ProductItem from '@/components/products/ProductItem.vue'
const userStore = useUserStore()
// breadcrumb
const routes = ref([
  {
    name: 'Home',
    path: '/',
  },
])

const product = ref({
  id: '',
  name: '',
  userId: '',
  description: '',
  categoryId: '',
  sold: 0,
  condition: '',
  types: [],
  images: [],
})

const typeSelected = ref(null)
const isLoading = ref(false)
const showFullDescription = ref(false)

const descriptionLines = computed(() => {
  if (!product.value.description) return []
  return product.value.description.split('\n')
})

const displayedDescription = computed(() => {
  if (!product.value.description) return ''
  if (showFullDescription.value) return product.value.description
  return descriptionLines.value.slice(0, 10)
})

const hasMoreDescription = computed(() => {
  return descriptionLines.value.length > 10
})

const priceComputed = computed(() => {
  return typeSelected.value
    ? {
        price: typeSelected.value.price,
      }
    : {
        min: product.value.types[0]?.price,
        max: product.value.types[product.value.types.length - 1]?.price,
      }
})

const getProduct = async () => {
  try {
    isLoading.value = true
    console.log('Fetching product with ID:', route.params.id)
    const res = await getProductApi(route.params.id)
    
    if (!res.data) {
      console.error('No data returned from API')
      router.push({ name: 'not-found' })
      return
    }

    product.value = res.data
    console.log('Product data:', product.value)

    let routeSubCategory = {}
    const routeCategory = masterStore.state.categories.find((category) =>
      category.subCategories.find((subCategory) => {
        if (subCategory.id === product.value.categoryId) {
          routeSubCategory = subCategory
          return true
        }
        return false
      })
    )

    if (!routeCategory || !routeSubCategory) {
      console.error('Category or subcategory not found for product:', product.value.categoryId)
      return
    }

    routes.value = [
      {
        name: 'Home',
        path: '/',
      },
      {
        name: routeCategory.name,
        path: `/category/${routeCategory.id}`,
      },
      {
        name: routeSubCategory.name,
        path: `/category/${routeCategory.id}/sub-category/${routeSubCategory.id}`,
      },
      {
        name: product.value.name,
        path: `/product/${product.value.id}`,
      }
    ]
  } catch (error) {
    console.error('Error fetching product:', error)
    if (error.response?.status === 404) {
      router.push({ name: 'not-found' })
    }
  } finally {
    isLoading.value = false
  }
}

const chooseType = (type) => {
  if (typeSelected.value === type) {
    typeSelected.value = null
    return
  }
  typeSelected.value = type
}

const productsRecommend = ref([])

async function getListRecommend() {
  try {
    const { data } = await getRecommendedProductsByProductId(route.params.id)
    productsRecommend.value = data
  } catch (error) {
    console.error('Error fetching recommended products:', error)
    toast.error('Failed to load recommended products')
    productsRecommend.value = []
  }
}
const cart = ref({
  id: '',
  quantity: 1,
})

const shopDetail = ref({
  id: '',
  name: '',
  description: '',
  address: '',
  phone: '',
  email: '',
  images: [],
})

onBeforeMount(async () => {
  try {
    await getProduct()
    await getUser()
    await getListRecommend()
  } catch (error) {
    console.log(error)
  }
})
const getUser = async () => {
  const res = await userStore.getUser(product.value.userId)
  shopDetail.value = res
}

const errValidate = computed(() => {
  if (cart.value.quantity > typeSelected.value?.quantity) {
    return {
      cart: 'Quantity must be less than quantity in stock',
    }
  }
  if (!typeSelected.value) {
    return {
      cart: 'Please choose type',
    }
  }
  return {
    cart: '',
  }
})

const addToCart = async () => {
  try {
    if (!typeSelected.value) {
      return
    }
    const res = await addToCartApi({
      productTypeId: typeSelected.value.id,
      quantity: cart.value.quantity,
    })
    masterStore.addToCart(res.data.items)
    toast.success('Add to cart success')
  } catch (error) {
    console.log(error)
    toast.error('Add to cart fail')
  }
}

const buyNow = () => {
  if (!typeSelected.value) {
    return
  }
  popupStore.showPopup({
    content: 'Do you want to checkout now?',
    type: 'confirm',
    onConfirm: () => {
      console.log('confirm')
      router.push({ name: 'checkout-direct', query: { typeId: typeSelected.value.id, quantity: cart.value.quantity } })
    },
  })
}
</script>
