<template>
   <div class="login">
    <form @submit.prevent="login">
      <input type="email" v-model="email" required>
      <input type="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>

    <button type="button" @click="googleSignIn">
      Login with Google
    </button>
    <button type="button" @click="githubSignIn">
      Login with Github
    </button>

    <p v-if="error" class="error">{{ error }}</p>
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

const error = computed(() => store.getters['auth/authError'])

const login = async () => {
  store.dispatch('auth/clearError')
  try {
    await store.dispatch('auth/login', {
      email: email.value,
      password: password.value,
    })
    router.push({ name: 'Home' })
  } catch (err) {
    console.error('Login error:', err)
  }
}
</script>