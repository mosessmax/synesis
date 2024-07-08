import { createRouter, createWebHistory, routerKey } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import TestTaking from '../views/TestTaking.vue'
import Results from '../views/Results.vue'

const routes = [

{ path: '/', redirect: '/login' },
{ path: '/login', component: Login },
{ path: '/register', component: Register },
{ 
  path: '/dashboard', 
  component: Dashboard,
  meta: { requiresAuth: true }
},
{ 
  path: '/test/:id', 
  component: TestTaking,
  meta: { requiresAuth: true }
},
{ 
  path: '/results/:id', 
  component: Results,
  meta: { requiresAuth: true }
},
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(( to, from, next ) => {
  const isAuthenticated = localStorage.getItem('token')
  // if.to matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})  
export default router
