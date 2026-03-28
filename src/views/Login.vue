<template>
  <div class="container mt-5" style="max-width:400px;">
    <h2 class="mb-4 text-center">Iniciar sesión 🔐</h2>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Email</label>
        <input 
          v-model="email" 
          type="email" 
          class="form-control" 
          required 
        >
      </div>

      <div class="mb-3">
        <label>Contraseña</label>
        <input 
          v-model="password" 
          type="password" 
          class="form-control" 
          required 
        >
      </div>

      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <button class="btn btn-primary w-100">Ingresar</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const store = useStore()
    const router = useRouter()

    // Si ya está logueado, redirige al home
    onMounted(() => {
      if (store.getters.isAuthenticated) {
        router.push('/')
      }
    })

    const handleLogin = async () => {
      const success = await store.dispatch('login', { email: email.value, password: password.value })
      
      if (success) {
        router.push('/') // redirige a home u otra ruta privada
      } else {
        error.value = 'Usuario o contraseña incorrectos'
      }
    }

    return {
      email,
      password,
      error,
      handleLogin
    }
  }
}
</script>