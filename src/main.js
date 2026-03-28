// src/main.js
import './assets/css/styles.css'
import './assets/css/main.css'
import { createApp } from 'vue'

import App from './App.vue' // si tu App.vue está en /views
import router from './router/index.js'
import store from './stores/index.js' // <-- aquí usamos Vuex en lugar de Pinia

const app = createApp(App)

app.use(router)  // Vue Router
app.use(store)   // Vuex

app.mount('#app')