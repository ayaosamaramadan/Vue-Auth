import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Home from '../components/Home.vue'
import Login from '../auth/views/Login.vue'
import SignUp from '../auth/views/SignUp.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // 🔒 protected
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guestOnly: true }, // 🚪 redirect if already logged in
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: { guestOnly: true },
  },
  {
    // Catch-all — redirect to home
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ─── Navigation guard ───────────────────────────────────────────────────────
router.beforeEach(async (to, _from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const token = store.state.auth.token

  // If we have a token but no user yet, fetch user (page reload case)
  if (token && !store.state.auth.user) {
    await store.dispatch('auth/fetchUser')
  }

  const authOk = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !authOk) {
    // Route needs auth but user is not authenticated
    return next({ name: 'Login' })
  }

  if (to.meta.guestOnly && authOk) {
    // Logged-in user tries to access Login/SignUp
    return next({ name: 'Home' })
  }

  next()
})

export default router