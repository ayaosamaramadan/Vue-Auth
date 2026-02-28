
   <template>
     <div class="login">
      <form @submit.prevent="login">
        <input type="email" v-model="email" required>
        <input type="password" v-model="password" required>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
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
        } catch (err) {
          this.error = err.code ? `${err.code}: ${err.message}` : err.message || String(err)
        }
      }
    }
   }
   </script>