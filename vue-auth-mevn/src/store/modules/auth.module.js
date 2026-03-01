import authService from '../../auth/services/authService.js'

const TOKEN_KEY = 'mevn_auth_token'

const state = () => ({
  user: null,
  token: localStorage.getItem(TOKEN_KEY) || null,
  loading: false,
  error: null,
})

const getters = {
  isAuthenticated: (state) => !!state.token && !!state.user,
  currentUser: (state) => state.user,
  authError: (state) => state.error,
  isLoading: (state) => state.loading,
}

const mutations = {
  SET_LOADING(state, value) {
    state.loading = value
  },
  SET_AUTH(state, { user, token }) {
    state.user = user
    state.token = token
    localStorage.setItem(TOKEN_KEY, token)
  },
  SET_USER(state, user) {
    state.user = user
  },
  SET_ERROR(state, message) {
    state.error = message
  },
  CLEAR_ERROR(state) {
    state.error = null
  },
  LOGOUT(state) {
    state.user = null
    state.token = null
    localStorage.removeItem(TOKEN_KEY)
  },
}

const actions = {
  // Register new user
  async register({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    try {
      const { user, token } = await authService.register(credentials)
      commit('SET_AUTH', { user, token })
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Login existing user
  async login({ commit }, credentials) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    try {
      const { user, token } = await authService.login(credentials)
      commit('SET_AUTH', { user, token })
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Fetch current user (refresh on page reload)
  async fetchUser({ commit, state }) {
    if (!state.token) return
    commit('SET_LOADING', true)
    try {
      const { user } = await authService.getMe(state.token)
      commit('SET_USER', user)
    } catch {
      // Token is invalid/expired — clear auth
      commit('LOGOUT')
    } finally {
      commit('SET_LOADING', false)
    }
  },

  // Logout
  async logout({ commit, state }) {
    try {
      if (state.token) await authService.logout(state.token)
    } finally {
      commit('LOGOUT')
    }
  },

  // Called after OAuth redirect — store token then fetch user
  async loginWithToken({ commit }, token) {
    commit('SET_LOADING', true)
    try {
      localStorage.setItem('mevn_auth_token', token)
      commit('SET_AUTH', { user: null, token }) // temporarily store token
      const { user } = await authService.getMe(token)
      commit('SET_USER', user)
    } catch (error) {
      commit('SET_ERROR', error.message)
      commit('LOGOUT')
      throw error
    } finally {
      commit('SET_LOADING', false)
    }
  },

  clearError({ commit }) {
    commit('CLEAR_ERROR')
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
