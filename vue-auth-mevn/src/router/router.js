import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Home from '../components/Home.vue'
import Login from '../auth/views/Login.vue'
import SignUp from '../auth/views/SignUp.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
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