import { createRouter, createWebHistory } from 'vue-router'
// import store from '@/store/index'
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


export default router