import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import { auth } from './firebase'
import store from './store'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/home',
            name: 'home',
            component: Home,

        },
        {
            path: '/admin',
            name: 'admin',

            component: () =>
                import ('./views/Admin.vue'),
            meta: {
                requiresAuth: true
            }

        },
        {
            path: '/noticias',
            name: 'noticias',

            component: () =>
                import ('./views/Noticias.vue')
        },
        {
            path: '/juegos',
            name: 'juegos',

            component: () =>
                import ('./views/Juegos.vue')
        },
        {
            path: '/perfil',
            name: 'perfil',
            component: () =>
                import ('./views/Perfil.vue'),
            meta: {
                requiresAuth: true
            }

        },
        {
            path: '/mapa',
            name: 'mapa',

            component: () =>
                import ('./views/Mapa.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/',
            name: '/',

            component: () =>
                import ('./views/Home.vue')
        },
        {
            path: '/login',
            name: 'login',

            component: () =>
                import ('./views/Login.vue')
        },
        {
            path: '/about',
            name: 'about',

            component: () =>
                import ('./views/About.vue')
        },
        {
            path: '/register',
            name: 'register',

            component: () =>
                import ('./views/Register.vue')
        },

    ]
})

router.beforeEach(async(to, from, next) => {
    let currentUser = store.state.user;
    
    let requriesAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requriesAuth && !currentUser) {

        next('/')
    } else {
        next()
    }
})

export default router;