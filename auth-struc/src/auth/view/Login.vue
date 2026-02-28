
   <template>
     <div class="login">
       <form @submit.prevent="login">
         <input type="email" v-model="email" required>
         <input type="password" v-model="password" required>
         <button type="submit">Login</button>
       </form>
     </div>
   </template>

   <script>
   export default {
     data() {
       return {
         email: '',
         password: ''
       }
     },
     methods: {
       login() {
         this.$store.dispatch('login', {
           email: this.email,
           password: this.password
         })
       }
     }
   }
   </script>