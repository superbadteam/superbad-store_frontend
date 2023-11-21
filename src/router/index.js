import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/auth/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('@/views/auth/RegisterPage.vue'),
  },
  {
    path: '/create-product',
    name: 'create-product',
    meta: { requiresAuth: true },
    component: () => import('@/views/product/CreateProductView.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
