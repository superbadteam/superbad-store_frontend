import { useAuthStore } from './auth.store'
import { getInfo } from '@/services/auth.service'
import { useMasterStore } from './master.store'
import { getCategoriesApi } from '@/services/master.service'

export const initAuthStore = async () => {
  const authStore = useAuthStore()
  if (localStorage.getItem('access_token')) {
    const { data } = await getInfo()
    authStore.setAuthStore({
      user: data,
      isLoggedIn: true,
    })
    console.log('initAuthStore', authStore)
  }
}

export const initMasterStore = async () => {
  const masterStore = useMasterStore()
  const { data } = await getCategoriesApi()
  masterStore.setCategories(data)
  console.log('initMasterStore', masterStore)
}
