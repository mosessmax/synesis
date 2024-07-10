import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue' // Add this line
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import TestTaking from '../views/TestTaking.vue'
import Results from '../views/Results.vue'
import Layout from '@/components/Layout.vue'

const routes = [
  { 
    path: '/', 
    component: Layout,
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
      { path: 'test-taking', component: TestTaking, meta: { requiresAuth: true } },
      { path: 'results', component: Results, meta: { requiresAuth: true } },
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') // You might want to use a more secure method
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router