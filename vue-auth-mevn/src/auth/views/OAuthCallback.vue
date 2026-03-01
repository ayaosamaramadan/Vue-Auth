<template>
  <div >
    <div>
      <p v-if="error">{{ error }}</p>
      <p v-else>Authenticating... please wait.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()
const error = ref(null)

onMounted(async () => {
  const token = route.query.token
  const err = route.query.error

  if (err) {
    error.value = decodeURIComponent(err)
    setTimeout(() => router.push({ name: 'Login' }), 3000)
    return
  }

  if (!token) {
    error.value = 'No token received.'
    setTimeout(() => router.push({ name: 'Login' }), 2000)
    return
  }

  // Store token + fetch user profile
  await store.dispatch('auth/loginWithToken', token)
  router.push({ name: 'Home' })
})
</script>
