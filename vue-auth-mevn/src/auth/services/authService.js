import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Helper: extract a clean error message from an axios error
 */
const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.message ||
    'Something went wrong'
  )
}

const authService = {
  /**
   * POST /auth/register
   * @param {{ name: string, email: string, password: string }} payload
   * @returns {{ user, token }}
   */
  async register(payload) {
    try {
      const { data } = await api.post('/auth/register', payload)
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * POST /auth/login
   * @param {{ email: string, password: string }} payload
   * @returns {{ user, token }}
   */
  async login(payload) {
    try {
      const { data } = await api.post('/auth/login', payload)
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * GET /auth/me — fetch current authenticated user
   * @param {string} token
   * @returns {{ user }}
   */
  async getMe(token) {
    try {
      const { data } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      return data
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  /**
   * POST /auth/logout — notify server (JWT stateless, mainly for logging)
   * @param {string} token
   */
  async logout(token) {
    try {
      await api.post(
        '/auth/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } catch {
      // Silently fail — client clears token regardless
    }
  },
}

export default authService
