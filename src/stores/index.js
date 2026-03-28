// src/stores/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false,
    unit: 'C',
    favorites: []
  },
  mutations: {
    LOGIN(state, payload) {
      state.user = payload.user
      state.isAuthenticated = true
      state.favorites = payload.favorites || []
    },
    LOGOUT(state) {
      state.user = null
      state.isAuthenticated = false
      state.unit = 'C'
      state.favorites = []
    },
    SET_UNIT(state, newUnit) {
      state.unit = newUnit
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      const users = [
        { email: 'test@test.com', password: '1234', name: 'Test User', favorites: ['Santiago', 'Valpo'] }
      ]
      const found = users.find(u => u.email === email && u.password === password)
      if (found) {
        commit('LOGIN', { user: found, favorites: found.favorites })
        return true
      }
      return false
    },
    logout({ commit }) {
      commit('LOGOUT')
    },
    setUnit({ commit }, newUnit) {
      commit('SET_UNIT', newUnit)
    },
    setFavorites({ commit }, favorites) {
      commit('SET_FAVORITES', favorites)
    }
  },
  getters: {
    user: state => state.user,
    isAuthenticated: state => state.isAuthenticated,
    unit: state => state.unit,
    favorites: state => state.favorites
  }
})