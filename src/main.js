import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import './assets/css/tailwind.css'
import './assets/css/global.css'
import { createPinia } from 'pinia'
import { initAuthStore, initMasterStore } from '@/stores'
import { authMiddleware } from '@/router/router.middleware'
import defaultLayout from '@/layouts/defaultLayout.vue'
import dashboardLayout from '@/layouts/dashboardLayout.vue'
import emptyLayout from '@/layouts/emptyLayout.vue'
import touchOutSide from '@/plugins/handleClick'
import 'remixicon/fonts/remixicon.css'
import ACustomPopup from '@/components/commons/atoms/ACustomPopup.vue'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const initApp = async () => {
  const app = createApp(App)
  app.use(createPinia())
  await initAuthStore()
  await initMasterStore()
  app.use(router)
  authMiddleware()
  app.use(touchOutSide)
  app.component('DefaultLayout', defaultLayout)
  app.component('EmptyLayout', emptyLayout)
  app.component('DashboardLayout', dashboardLayout)
  app.component('ACustomPopup', ACustomPopup)
  app.use(Vue3Toastify, {
    position: 'top-center',
    duration: 3000,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    closeOnClick: true,
    processBar: false,
    icon: true,
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
  })
  router.isReady().then(() => {
    console.log('router ready')
    app.mount('#app', true)
  })
}
initApp()
