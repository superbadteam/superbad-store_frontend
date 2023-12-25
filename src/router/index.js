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
    path: '/profiles/:id',
    name: 'profile-detail',
    props: {
      type: 'VIEW',
    },
    component: () => import('@/views/dashboard/ProfileSetting.vue'),
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('@/views/product/_id/ProductDetailView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/checkout/CheckoutView.vue'),
  },
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
        path: 'manage-product',
        name: 'manage-product',
        meta: { requiresAuth: true },
        component: () => import('@/views/dashboard/ProductManager.vue'),
      },
      {
        path: 'profile-settings',
        name: 'profile-settings',
        props: {
          type: 'SETTING',
        },
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
    component: () => import('@/views/NotFoundPage.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
