import firebase from 'firebase'
import 'firebase/firestore'
import store from './store'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAvs_msXFU3qmiHdNxzoFyDYlf0ktoGMog",
    authDomain: "backend-b47af.firebaseapp.com",
    databaseURL: "https://backend-b47af.firebaseio.com",
    projectId: "backend-b47af",
    storageBucket: "backend-b47af.appspot.com",
    messagingSenderId: "190828053456",
    appId: "1:190828053456:web:0fa7d1bf3f09cea8"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch('setUser', user);
    } else {
        store.dispatch('setUser', null);
    }
});


export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();