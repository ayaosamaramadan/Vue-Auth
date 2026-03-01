<template>
    <div>
        
        <h1>Home</h1>
        <p v-if="user">Welcome, {{ displayName }}</p>
        <p v-else>Welcome, Guest!</p>
    </div>
</template>

<script setup>
</script>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(['user']),
        displayName() {
            if (!this.user) return ''
            return this.user.displayName || this.user.email || 'User'
        }
    }}
</script>

<style lang="scss" scoped>

</style>