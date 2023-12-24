// refactor user store
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMasterStore = defineStore('master', () => {
  const state = ref({
    categories: [],
    products: [],
  })

  const setCategories = (data) => {
    state.value.categories = data
  }

  const setProducts = (data) => {
    state.value.products = data
  }

  return {
    state,
    setCategories,
    setProducts,
  }
})
