import router from '.'
import { useAuthStore } from '@/stores/auth.store'
export const authMiddleware = () => {
  router.beforeEach((to, from) => {
    const authStore = useAuthStore()
    const isLoggedIn = localStorage.getItem('access_token')
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!isLoggedIn) {
        return { name: 'login' }
      } else {
        // handle logged in user permission
        const user = authStore.state.user
        const userRole = user.role
        if (to.meta.roles && !to.meta.roles.includes(userRole)) {
          console.log('403')
          return { name: 'home' }
        }
      }
    } else {
      if (isLoggedIn && to.name == 'login') {
        return { name: 'home' }
      }
    }
    console.log('next')
  })
}
