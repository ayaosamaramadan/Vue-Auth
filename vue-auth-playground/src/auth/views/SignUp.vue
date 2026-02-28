<template>
  <div class="signup">
    <form @submit.prevent="signup">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
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
    async signup() {
      this.error = null
      try {
        await this.$store.dispatch('signup', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/')
      } catch (err) {
        this.error = err.code ? `${err.code}: ${err.message}` : err.message || String(err)
      }
    }
  }
}
</script>

<style scoped>
.error { color: red; margin-top: 8px }
</style>
