import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/letter:letter',
      name: 'letter',
      component: () => import('../views/LetterView.vue'),
      params: true,
    }
  ]
})

export default router
