import { ref } from 'vue'
// export const authStore = ref({
//   user: null,
//   isLoggedIn: false,
// })

// export const initAuthStore = async () => {
//   if (localStorage.getItem('access_token')) {
//     const { data } = await getInfo()
//     authStore.value.user = data
//     authStore.value.isLoggedIn = true
//     console.log('initAuthStore', authStore.value)
//   }
// }

// refactor user store
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const state = ref({
    user: null,
    isLoggedIn: false,
  })

  const setAuthStore = (data) => {
    state.value = data
  }
  return {
    state,
    setAuthStore,
  }
})
