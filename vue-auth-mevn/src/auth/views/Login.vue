<template>
  <div>
    <div>
      <h2>Login</h2>

      <p v-if="error">{{ error }}</p>

      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email</label>
          <input id="email" type="email" v-model="email" required autocomplete="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" type="password" v-model="password" required autocomplete="current-password" />
        </div>
        <button type="submit">
          Login
        </button>
      </form>

      <div>
        <button @click="oauthLogin('google')">
          Continue with Google
        </button>
        <button @click="oauthLogin('github')">
          Continue with GitHub
        </button>
      </div>

      <p>
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