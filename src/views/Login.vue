<template>
  
      <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="black">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              
              </v-toolbar>
              <v-card-text>
                <v-form >
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="usuario"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="pass"></v-text-field>

                </v-form>
              </v-card-text>
              
              <v-card-actions>
                <v-card-text > <router-link :to="{name: 'register'}">Regístrate aquí </router-link></v-card-text>
                <v-btn @click="login" class="white--text warning" >Login</v-btn>
              </v-card-actions>
              
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
 
</template>

<script>
import {auth} from '../firebase'
import store from "vuex"
export default {
  data(){
    return{
      usuario:'',
      pass: ''
    }
  },
  methods:{
    login(){
      auth
      .signInWithEmailAndPassword(this.usuario, this.pass)
      .then(user =>{
        alert('usuario logged');
        this.$router.push('/perfil');
        this.$store.dispatch("setLogged", true)
      },
      err => {
        alert(err.message)
      }      
      );
    }
  }
}
</script>
