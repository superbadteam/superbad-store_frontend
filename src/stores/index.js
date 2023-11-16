import { useAuthStore } from './auth.store'
import { getInfo } from '@/services/auth.service'

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
