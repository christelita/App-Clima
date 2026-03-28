// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import store from '../stores/index.js' // <-- Vuex store

import Home from '../views/Home.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'

const routes = [
  { 
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    component: () => import('../views/About.vue')
  },
  { 
    path: '/lugar/:id',
    component: Detail,
    meta: { requiresAuth: true } // Ruta protegida
  },
  { 
    path: '/login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guard para rutas protegidas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login') // Redirige al login si no está autenticado
  } else {
    next() // Permite continuar
  }
})

export default router