// refactor user store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoriesApi } from '@/services/master.service'
import { getCartApi } from '@/services/cart.service'

export const useMasterStore = defineStore('master', () => {
  const state = ref({
    categories: [],
    products: [],
    cart: {
      items: [],
      totalPrice: 0,
    },
  })

  const initCategories = async () => {
    const { data } = await getCategoriesApi()
    state.value.categories = data
  }

  const setProducts = (data) => {
    state.value.products = data
  }

  const addToCart = (data) => {
    state.value.cart.items = data
  }

  const removeFromCart = (id) => {
    state.value.cart = state.value.cart.items.filter((item) => item.id !== id)
  }

  const initCart = async () => {
    const { data } = await getCartApi()
    console.log('initCart', data)
    state.value.cart = data
  }

  return {
    state,
    initCategories,
    setProducts,
    addToCart,
    removeFromCart,
    initCart,
  }
})
