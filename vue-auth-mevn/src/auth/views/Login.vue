<template>
  <div class="login">
    <form>
      <input type="email" v-model="email" required>
      <input type="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>

    <button type="button">
      Login with Google
    </button>
    <button type="button">
      Login with Github
    </button>
  </div>
</template>

<script>

</script>