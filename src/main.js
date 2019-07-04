import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps";
import { auth } from './firebase'



require("dotenv").config();

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBjLVO8586tQl7D-5S9jzH6PVkD5r1fABE',
        libraries: ['places', 'geometry']
    }
});

Vue.config.productionTip = false

let app;
auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})