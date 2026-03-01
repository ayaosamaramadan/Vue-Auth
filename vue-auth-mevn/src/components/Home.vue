<template>
    <div>
        <h1>Home</h1>
        <div v-if="user">
            <p>Welcome, {{ user?.name }}</p>
            <p>Email: {{ user?.email }}</p>
            <p>ID: {{ user?.id }}</p>
        </div>

        <p v-else>Welcome, Guest!</p>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const user = computed(() => store.getters['auth/currentUser'])
</script>

<style scoped>

</style>