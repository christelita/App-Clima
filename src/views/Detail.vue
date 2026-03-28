<template>
  <div v-if="city" class="container mt-4" style="max-width: 700px;">
    
    <button class="btn btn-link mb-3" @click="goBack">
      ⬅️ Volver
    </button>

    <div class="card shadow-lg border-0 detail-card">
      <div class="card-body p-4">

        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2>{{ city.name }}</h2>

          <select v-model="unit"
            class="form-select form-select-sm w-auto shadow-sm"
            :disabled="!isAuth"
          >
            <option value="C">°C</option>
            <option value="F">°F</option>
          </select>
        </div>

        <div class="row">

          <!-- INFO PRINCIPAL -->
          <div class="col-md-4 text-center border-end pe-4">
            <div class="fs-1 fw-bold mt-2">
              {{ formatTemp(city.temp) }}
            </div>
            <div class="text-muted">{{ city.state }}</div>
          </div>

          <!-- DETALLE -->
          <div class="col-md-8">
            <ul class="list-group mb-3">
              <li class="list-group-item">💧 Humedad: {{ city.humidity }}%</li>
              <li class="list-group-item">🌬️ Viento: {{ city.wind }}</li>
              <li class="list-group-item">📍 {{ city.coords }}</li>
            </ul>

            <h5>Pronóstico semanal 🗓️</h5>

            <div class="row g-2">
              <div 
                v-for="day in city.weekly" 
                :key="day.day" 
                class="col-6 col-md-4"
              >
                <div class="card">
                  <div class="card-body p-2 text-center">
                    <div class="small text-muted">{{ day.day }}</div>
                    <div class="fw-bold">{{ formatTempDay(day) }}</div>
                    <div class="small text-muted">{{ day.state }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="stats" class="mt-4 p-3 border rounded bg-light">
              <h5>Estadísticas de la semana</h5>

              <ul class="list-group mb-2">
                <li class="list-group-item">🌡️ Mínima: {{ formatTemp(stats.minTemp) }}</li>
                <li class="list-group-item">🔥 Máxima: {{ formatTemp(stats.maxTemp) }}</li>
                <li class="list-group-item">📊 Promedio: {{ formatTemp(stats.avgTemp) }}</li>
              </ul>

              <p class="fw-bold">{{ stats.summary }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- 👇 MUY IMPORTANTE: si no encuentra la ciudad -->
  <div v-else class="text-center mt-5">
    <h3>⚠️ No se encontró la ciudad</h3>
    <p>Revisa el ID o vuelve al inicio</p>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CITIES } from '../data/cities'
import store from '../stores/index.js'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const city = ref(null)
    const stats = ref(null)

    const isAuth = computed(() => store.getters.isAuthenticated)

    const unit = computed({
      get: () => store.getters.unit,
      set: (value) => {
        if (!store.getters.isAuthenticated) return
        store.dispatch('setUnit', value)
      }
    })

    const calculateWeeklyStats = (weekly) => {
      const temps = weekly.map(d => (d.max + d.min) / 2)
      const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length

      let summary = ""
      if (avgTemp < 15) summary = "Semana fría ❄️"
      else if (avgTemp < 25) summary = "Semana templada 🌤️"
      else summary = "Semana calurosa 🔥"

      return {
        minTemp: Math.min(...weekly.map(d => d.min)),
        maxTemp: Math.max(...weekly.map(d => d.max)),
        avgTemp: Math.round(avgTemp),
        summary
      }
    }

    const formatTemp = (temp) => {
      return unit.value === "C"
        ? `${temp}°C`
        : `${Math.round(temp * 9 / 5 + 32)}°F`
    }

    const formatTempDay = (day) => {
      const min = unit.value === "C" ? day.min : Math.round(day.min * 9 / 5 + 32)
      const max = unit.value === "C" ? day.max : Math.round(day.max * 9 / 5 + 32)
      return `${max}° / ${min}°`
    }

    const goBack = () => {
      router.push('/')
    }

    onMounted(() => {
      console.log("ID recibido:", route.params.id)
      const idParam = route.params.id

      // Lógica de búsqueda corregida
      if (!isNaN(idParam) && idParam !== "") {
        city.value = CITIES[Number(idParam)]
      } else {
        city.value = CITIES.find(c => c.id === idParam)
      }

      console.log("Ciudad encontrada:", city.value)

      if (city.value) {
        stats.value = calculateWeeklyStats(city.value.weekly)
      }
    })

    return {
      city,
      stats,
      unit,
      formatTemp,
      formatTempDay,
      goBack,
      isAuth
    }
  } // <--- Cierre del setup
} // <--- Cierre del export default
</script>