<template>
  <div class="home">
    <h1>Welcome back, {{ user?.name }}! 🎉</h1>
    <p>You are authenticated. Your account details:</p>
    <div class="user-card">
      <p><strong>Name:</strong> {{ user?.name }}</p>
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <p><strong>ID:</strong> {{ user?.id }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.getters['auth/currentUser'])
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 4rem auto;
  padding: 2rem;
  text-align: center;
}
.user-card {
  margin-top: 1.5rem;
  background: #f4f4f8;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  font-size: 0.95rem;
  color: #333;
}
.user-card p { margin: 0.4rem 0; }
</style>