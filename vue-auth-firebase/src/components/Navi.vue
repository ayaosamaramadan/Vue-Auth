<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/signup">Sign Up</router-link></li>
            <li v-if="isAuthenticated"><button @click="handleLogout">Logout</button></li>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isAuthenticated = computed(() => store.getters.isUserAuthenticated)
const handleLogout = async () => {
    await store.dispatch('logout')
}

</script>

<style lang="scss" scoped>

</style>