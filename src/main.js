import { createApp } from 'vue'
import router from '@/router'
import App from './App.vue'
import './assets/css/tailwind.css'
import './assets/css/global.css'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import { initAuthStore } from '@/stores'
import { authMiddleware } from '@/router/router.middleware'
import defaultLayout from '@/layouts/defaultLayout.vue'
import dashboardLayout from '@/layouts/dashboardLayout.vue'
import emptyLayout from '@/layouts/emptyLayout.vue'
import touchOutSide from '@/plugins/handleClick'
import 'remixicon/fonts/remixicon.css'

const initApp = async () => {
  const app = createApp(App)
  app.use(createPinia())
  await initAuthStore()
  app.use(router)
  authMiddleware()
  app.use(touchOutSide)
  app.component('DefaultLayout', defaultLayout)
  app.component('EmptyLayout', emptyLayout)
  app.component('DashboardLayout', dashboardLayout)
  app.use(Notifications)
  router.isReady().then(() => {
    console.log('router ready')
    app.mount('#app', true)
  })
}
initApp()
