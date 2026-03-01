import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import Home from '../components/Home.vue'
import Login from '../auth/views/Login.vue'
import SignUp from '../auth/views/SignUp.vue'
import OAuthCallback from '../auth/views/OAuthCallback.vue'

const routes = [
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login, meta: { guestOnly: true } },
  { path: '/signup', name: 'SignUp', component: SignUp, meta: { guestOnly: true } },
  // OAuth callback — no guards, passport redirects here with ?token=
  { path: '/auth/callback', name: 'OAuthCallback', component: OAuthCallback },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, _from, next) => {
  // Always let the OAuth callback through first
  if (to.name === 'OAuthCallback') return next()

  const token = store.state.auth.token
  if (token && !store.state.auth.user) {
    await store.dispatch('auth/fetchUser')
  }

  const authed = store.getters['auth/isAuthenticated']

  if (to.meta.requiresAuth && !authed) return next({ name: 'Login' })
  if (to.meta.guestOnly && authed) return next({ name: 'Home' })
  next()
})

export default router