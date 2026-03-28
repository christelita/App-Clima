<template>
  <div>
    <header class="weather-app__header bg-primary py-2 shadow-sm">
      <nav class="container d-flex justify-content-between align-items-center">

        <!-- Clima animado a la izquierda -->
        <div class="d-flex align-items-center gap-3">
          <div class="clima-animado">☀️⛅🌧️⛈️</div>
          <h1 class="title">El Tiempo en el 🗺️</h1>
        </div>

        <!-- Navbar a la derecha -->
        <div class="d-flex align-items-center gap-3">
          <router-link to="/" class="nav-link fw-semibold text-light">🏠 Home</router-link>
          <router-link to="/about" class="nav-link fw-semibold text-light">ℹ️ Acerca de</router-link>
          
          <router-link v-if="!isAuth" to="/login" class="nav-link fw-semibold text-light">
            Login
          </router-link>

          <div v-if="isAuth" class="d-flex align-items-center gap-2">
            <span class="text-light small d-none d-sm-inline">
              ¡Hola! <strong>{{ user.name }}</strong> 👋🏽
            </span>

            <button 
              @click="logout" 
              class="btn btn-sm btn-outline-light fw-bold"
              style="font-size: 0.75rem;"
            >
              Logout
            </button>
          </div>
        </div>

      </nav>
    </header>
  
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
   
    <footer class="weather-app__footer">
      <small>Weather Frontend - Módulo 8 • Entrega educativa💻 • Hecho con 💙</small>
    </footer>

    <div class="weather-indicator" aria-hidden="true">🌡️2️⃣0️⃣2️⃣6️⃣🌡️</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import store from './stores/index.js' // <-- Vuex store

export default {
  setup() {
    const user = computed(() => store.getters.user)
    const isAuth = computed(() => store.getters.isAuthenticated)

    const logout = () => {
      store.dispatch('logout')
    }

    return {
      user,
      isAuth,
      logout
    }
  }
}
</script>