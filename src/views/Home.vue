<template>
  <div class="mt-4"></div>
  <div class="container">

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1 class="h5 fw-bold">Ciudades 🏢</h1>
      <select v-model="unit"
        :disabled="!isAuthenticated"
        :title="!isAuthenticated ? 'Ingresa a Login para cambiar a Fahrenheit 🔒' : 'Cambiar unidad'"
        class="form-select form-select-sm w-auto shadow-sm"
        :style="{ cursor: !isAuthenticated ? 'not-allowed' : 'pointer' }"
      >
        <option value="C">°C</option>
        <option value="F">°F</option>
      </select>
    </div>

    <div class="mb-4 col-12 col-sm-6 col-md-4 px-0 px-sm-2">
      <input 
        type="text" 
        v-model="search" 
        class="form-control form-control-sm shadow-sm" 
        placeholder="Buscar ciudad..."
      />
    </div>

    <transition-group name="fade" tag="div" class="row g-4">
      <div 
        v-for="city in filteredCities" 
        :key="city.id" 
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <div 
          class="card h-100 shadow-sm border-secondary-subtle position-relative" 
          @click="goToDetail(city.id)"
          style="cursor:pointer; border-radius: 12px; overflow: hidden; transition: transform 0.2s;"
        >
          <div style="height: 195px; overflow: hidden; background: #e6fffa;">
            <img 
              :src="`/Assets/cities/${normalizeName(city.name)}.png`" 
              class="card-img-top"
              :alt="city.name"
              style="width: 100%; height: 100%; object-fit: cover;"
            />
          </div>

          <button 
            @click.stop="toggleFavorite(city.id)" 
            class="btn btn-sm favorite-btn"
          >
            {{ favorites.includes(city.id) ? '⭐' : '☆' }}
          </button>

          <div class="card-body p-3 d-flex flex-column">
            <h2 class="h6 fw-bold mb-1">{{ city.name }}</h2>
            <p class="text-muted small mb-3"> {{ getWeatherIcon(city.state) }} {{ city.state }}</p>

            <div class="d-flex justify-content-between align-items-start mt-auto">
              <span class="h4 fw-bold mb-0 text-dark">{{ formatTemp(city.temp) }}</span>

              <div class="d-flex flex-column align-items-end gap-1">
                <div class="badge bg-info text-dark" style="font-size: 0.7rem;">
                  💧 {{ city.humidity }}%
                </div>
                <div class="badge bg-light text-secondary border" style="font-size: 0.65rem;">
                  🌬️ {{ city.wind }}
                </div>
                <div class="badge bg-secondary-subtle text-dark border" style="font-size: 0.6rem;">
                  📍 {{ city.coords }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition-group>

    <div v-if="filteredCities.length === 0" class="text-center py-5">
      <p class="text-muted">No encontramos resultados para tu búsqueda.</p>
    </div>

  </div> 
</template>

<script>
import { getWeatherByCity } from '../services/weatherService.js'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CITIES } from '../data/cities'
import store from '../stores/index.js' // <-- Vuex store

export default {
  setup() {
    const router = useRouter()
    const search = ref("")

    

    // Unidad de temperatura enlazada a Vuex
    const unit = computed({
      get: () => store.getters.unit,
      set: (value) => {
        if (!store.getters.isAuthenticated) return
        store.dispatch('setUnit', value)
      }
    })

    const cities = ref([])

    const loadWeather = async () => {
  try {
    const cityNames = CITIES.map(city => city.name)

    const results = await Promise.all(
      cityNames.map(name => getWeatherByCity(name))
    )

    cities.value = results.map((data, index) => ({
      id: index,
      name: data.name,
      temp: Math.round(data.main.temp),
      state: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      coords: `${data.coord.lat}, ${data.coord.lon}`
    }))

  } catch (error) {
    console.log('Error cargando clima', error)
  }
}

loadWeather()

    const filteredCities = computed(() => {
      const q = search.value.toLowerCase().trim()
      return cities.value.filter(c => c.name.toLowerCase().includes(q))
    })

    const goToDetail = (id) => {
      router.push(`/lugar/${id}?unit=${unit.value}`)
    }

    const formatTemp = (temp) => {
      const val = store.getters.unit === "C" ? temp : Math.round(temp * 9/5 + 32)
      return `${val}°`
    }

    const toggleFavorite = (id) => {
      if (!store.getters.isAuthenticated) {
        router.push('/login')
      return
      }
      

      const favorites = store.getters.favorites.slice() // copia del array
      const index = favorites.indexOf(id)
      if (index > -1) favorites.splice(index, 1)
      else favorites.push(id)

      store.dispatch('setFavorites', favorites) // 
    }

 const getWeatherIcon = (state = "") => {
  const s = state.toLowerCase()

  if (s.includes("cielo claro") || s.includes("despejado") || s.includes("soleado"))
    return "☀️"

  if (s.includes("nubes dispersas") || s.includes("parcial") || s.includes("algo nublado"))
    return "🌤️"

  if (s.includes("nublado") || s.includes("muy nuboso") || s.includes("nubes"))
    return "☁️"

  if (s.includes("lluv"))
    return "🌧️"

  if (s.includes("torment"))
    return "⛈️"

  if (s.includes("lloviz"))
    return "🌦️"

  if (s.includes("niebla") || s.includes("neblina") || s.includes("mist"))
    return "🌫️"

  if (s.includes("viento"))
    return "🌬️"

  return "🌡️"
}

    const normalizeName = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}
    return {
      search, unit, filteredCities, goToDetail, formatTemp, toggleFavorite, getWeatherIcon, normalizeName,
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      favorites: computed(() => store.getters.favorites)
    }
  }
}
</script>