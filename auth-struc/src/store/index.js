import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

firebase.initializeApp({
    apiKey: '<API_KEY>',
    authDomain: '<AUTH_DOMAIN>'
})

const store = new Vuex.Store({
    state: {
        user: null,
        token: localStorage.getItem('token')
    },
    getters: {
        isUserAuthenticated: state => state.token !== null
    },
    actions: {
        login({ commit }, { email, password }) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const token = userCredential.user.getIdToken()
                    commit('setToken', token)
                    return token
                })
        },
        logout({ commit }) {
            return firebase.auth().signOut()
                .then(() => {
                    commit('setToken', null)
                    router.push('/login')
                })
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token) {
                localStorage.setItem('token', token)
            } else {
                localStorage.removeItem('token')
            }
        }
    }
})