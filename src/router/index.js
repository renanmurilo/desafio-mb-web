import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/',
          component: () => import('@/components/register/Index.vue'),
        },
        {
          path: '/register/pessoa-fisica',
          component: () => import('@/components/register/pessoa-fisica/Index.vue'),
        },
        {
          path: '/register/pessoa-juridica',
          component: () => import('@/components/register/pessoa-juridica/Index.vue'),
        },
        {
          path: '/register/password',
          component: () => import('@/components/register/Password.vue'),
        },
        {
          path: '/register/resumo',
          component: () => import('@/components/register/Resumo.vue'),
        }
      ]
    },
  ]
})

export default router
