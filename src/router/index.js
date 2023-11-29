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
  // {
  //   path: '/create-product',
  //   name: 'create-product',
  //   meta: { requiresAuth: true },
  //   component: () => import('@/views/product/CreateProductView.vue'),
  // },
  //create nested routes use for dashboard ex create & manage product
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { layout: 'dashboard' },
    component: () => import('@/views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'create-product',
        name: 'create-product',
        meta: { requiresAuth: true },
        component: () => import('@/views/product/CreateProductView.vue'),
      },
      {
        path: 'profile-settings',
        name: 'profile-settings',
        meta: { requiresAuth: true },
        component: () => import('@/views/dashboard/ProfileSetting.vue'),
      },
    ],
  },
  {
    // catch all 404
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: { layout: 'empty' },
    component: () => import('@/views/404.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
