import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate";
export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        user: null
    },
    getters: {
        getUser: state => {
            return state.user;
        },
        getIsLogged: state => {
            return state.isLogged;
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLogged(state, isLogged) {
            state.isLogged = isLogged;
        }
    },
    actions: {
        setUser(context, user) {
            context.commit('setUser', user);
        },
        setLogged(context, isLogged) {
            context.commit('setLogged', isLogged);
        },
        signIn() {
            firebase.auth().signInWithPopup().then(function(result) {})
        },
        signOut() {
            firebase.auth().signOut();
        }
    }
})