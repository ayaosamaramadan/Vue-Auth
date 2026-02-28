import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        { path: '/login', component: () => import('@/views/Login.vue') },
        { path: '/dashboard', meta: { requiresAuth: true }, component: () => import('@/views/Dashboard.vue') }
    ]
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isUserAuthenticated = store.getters.isUserAuthenticated

    if (requiresAuth && !isUserAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router