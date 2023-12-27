import { useAuthStore } from './auth.store'
import { getInfo } from '@/services/auth.service'
import { useMasterStore } from './master.store'

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
  try {
    await Promise.all([masterStore.initCategories()])
    if (localStorage.getItem('access_token')) {
      await initAuthMasterStore(masterStore)
    }
  } catch (error) {
    console.log(error)
  }
}

const initAuthMasterStore = async (masterStore) => {
  await Promise.all([masterStore.initCart()])
}
