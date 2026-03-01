<template>
  <div class="auth-page">
    <div class="auth-card">
      <h2>Create Account</h2>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <form @submit.prevent="handleSignUp">
        <div class="field">
          <label for="name">Full Name</label>
          <input
            id="name"
            type="text"
            v-model="name"
            placeholder="John Doe"
            required
            autocomplete="name"
          />
        </div>

        <div class="field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="field">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="At least 6 characters"
            required
            minlength="6"
            autocomplete="new-password"
          />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating account...' : 'Sign Up' }}
        </button>
      </form>

      <p class="switch-link">
        Already have an account?
        <router-link to="/login">Login</router-link>
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

const name = ref('')
const email = ref('')
const password = ref('')

const loading = computed(() => store.getters['auth/isLoading'])
const error = computed(() => store.getters['auth/authError'])

const handleSignUp = async () => {
  store.dispatch('auth/clearError')
  try {
    await store.dispatch('auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    router.push({ name: 'Home' })
  } catch {
    // error is already set in the store
  }
}
</script>