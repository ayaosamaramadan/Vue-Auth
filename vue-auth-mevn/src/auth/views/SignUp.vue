<template>
  <div class="signup">
    <form>
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
      <div>
        <button type="button">
          Sign Up with Google
        </button>
        <button type="button">
          Sign up with Github
        </button>
      </div>
    </form>
  </div>
</template>

<script>  
</script>