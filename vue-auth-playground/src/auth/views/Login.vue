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

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      this.error = null
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (err) {
        this.error = err.code ? `${err.code}: ${err.message}` : err.message || String(err)
      }
    },
    async googleSignIn() {
      this.error = null
      try {
        const { signInWithGoogle } = await import('@/auth/services/googleAuth')
        const user = await signInWithGoogle()
        if (user && typeof user.getIdToken === 'function') {
          const token = await user.getIdToken()
          this.$store.commit('setToken', token)
        }
        this.$router.push('/')
      } catch (err) {
        this.error = err.code ? `${err.code}: ${err.message}` : err.message || String(err)
      }
    }
  }
}
</script>