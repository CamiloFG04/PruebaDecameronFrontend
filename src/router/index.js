import { createRouter, createWebHashHistory } from 'vue-router'
import authRouter from '@/modules/auth/router'
import hotelRouter from '@/modules/hotel/router'
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

const routes = [
  {
    path: '/',
    ...authRouter
  },
  {
    path: '/hotels',
    beforeEnter: [isAuthenticatedGuard],
    ...hotelRouter
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
