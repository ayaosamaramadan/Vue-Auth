<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Login</h2>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <form @submit.prevent="handleLogin">
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" placeholder="you@example.com" required autocomplete="email" />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" placeholder="••••••" required autocomplete="current-password" />
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="divider">or</div>

      <div class="oauth-buttons">
        <button class="oauth-btn google" @click="oauthLogin('google')">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
          Continue with Google
        </button>
        <button class="oauth-btn github" @click="oauthLogin('github')">
          <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
          Continue with GitHub
        </button>
      </div>

      <p class="switch-link">
        Don’t have an account? <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = computed(() => store.getters['auth/isLoading'])
const error = computed(() => store.getters['auth/authError'])

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const handleLogin = async () => {
  store.dispatch('auth/clearError')
  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value })
    router.push({ name: 'Home' })
  } catch { /* error shown via computed */ }
}

// Redirect browser directly to backend OAuth endpoint
const oauthLogin = (provider) => {
  window.location.href = `${API}/auth/${provider}`
}
</script>