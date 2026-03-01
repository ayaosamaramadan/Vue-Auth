<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">MEVN Auth</router-link>
    </div>
    <ul class="navbar-links">
      <template v-if="isAuthenticated">
        <li class="navbar-user">👋 {{ user?.name }}</li>
        <li><router-link to="/">Home</router-link></li>
        <li>
          <button class="btn-logout" @click="handleLogout" :disabled="loading">
            {{ loading ? 'Logging out...' : 'Logout' }}
          </button>
        </li>
      </template>
      <template v-else>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Sign Up</router-link></li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
const user = computed(() => store.getters['auth/currentUser'])
const loading = computed(() => store.getters['auth/isLoading'])

const handleLogout = async () => {
  await store.dispatch('auth/logout')
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background: #1a1a2e;
  color: #fff;
}
.navbar-brand a {
  font-size: 1.2rem;
  font-weight: bold;
  color: #e94560;
  text-decoration: none;
}
.navbar-links {
  display: flex;
  list-style: none;
  gap: 1rem;
  margin: 0;
  padding: 0;
  align-items: center;
}
.navbar-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.2s;
}
.navbar-links a:hover { color: #fff; }
.navbar-user { color: #a8dadc; font-size: 0.9rem; }
.btn-logout {
  background: #e94560;
  color: #fff;
  border: none;
  padding: 0.35rem 0.9rem;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-logout:hover { opacity: 0.85; }
.btn-logout:disabled { opacity: 0.5; cursor: not-allowed; }
</style>