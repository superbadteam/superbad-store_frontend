// refactor user store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserApi } from '@/services/user.service'

export const useUserStore = defineStore('user', () => {
  const state = ref({
    users: [],
  })

  const setUsers = (data) => {
    state.value.users = data
  }

  const addUser = async (id) => {
    const { data } = await getUserApi(id)
    state.value.users.push(data)
  }

  return {
    state,
    setUsers,
    addUser,
  }
})
