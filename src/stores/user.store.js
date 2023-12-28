// refactor user store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getShopDetailApi } from '@/services/user.service'

export const useUserStore = defineStore('user', () => {
  const state = ref({
    users: [],
  })

  const setUsers = (data) => {
    state.value.users = data
  }

  const getUser = async (id) => {
    const user = state.value.users.find((user) => user.id === id)
    if (user) return user
    const { data } = await getShopDetailApi(id)
    state.value.users.push(data)
    return data
  }

  return {
    state,
    setUsers,
    getUser,
  }
})
