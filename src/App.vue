<template>
  <v-app id="bg">
    <!--NavBar grande-->
    <v-toolbar id="showtool1" app color="black">
      <v-toolbar-title>
        <img src="./assets/1vs1black.png" style="width: 60px;" />
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn v-if="logged && isAdmin" color="black" class="white--text" block :to="{name: 'admin'}">Admin</v-btn>
      <v-btn color="black" class="white--text" block :to="{name: 'home'}">Home</v-btn>
      <v-btn color="black" class="white--text" block :to="{name: 'noticias'}">Noticias</v-btn>
      <v-btn color="black" class="white--text" block :to="{name: 'juegos'}">Premios</v-btn>
      <v-btn v-if="logged"  color="black" class="white--text" block :to="{name: 'mapa'}">Mapa</v-btn>
      <v-btn color="black" class="white--text" block :to="{name: 'about'}">About</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="logged && !isAdmin" icon :to="{name: 'perfil'}">
        <img
          style="border-radius: 83px; width: 120%; border: 2px solid red;"
          src="./assets/1vs1black.png"
        />
      </v-btn>
      <v-btn v-if="!logged" :to="{name: 'login'}" dark color="warning">Login</v-btn>
      <v-btn v-if="logged" :to="{name: 'login'}" dark color="warning" @click="logout">Logout</v-btn>
    </v-toolbar>

    <!--NavBar pequeña-->
    <v-toolbar id="showtool" app color="black">
      <v-toolbar-side-icon dark @click="drawer= !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <img src="./assets/1vs1black.png" style="width: 55px" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!logged" :to="{name: 'login'}" dark color="warning">Login</v-btn>
      <v-btn v-if="logged" :to="{name: 'login'}" dark color="warning" @click="logout">Logout</v-btn>
    </v-toolbar>

    <!--navigation horizontal-->
    <v-navigation-drawer class="black" app v-model="drawer" temporary width="200px">
      <v-layout column>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <v-btn v-if="logged && !isAdmin" icon :to="{name: 'perfil'}">
              <img
                src="./assets/1vs1black.png"
                style="border: 2px solid red;"
              />
            </v-btn>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title class="white--text"> <h3>Mi perfil</h3> </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider color="grey"></v-divider>
        <v-flex>
          <v-btn v-if="logged && isAdmin" color="black" class="white--text" block :to="{name: 'admin'}">Admin</v-btn>
          <v-btn color="black" class="white--text" block :to="{name: 'home'}">Home</v-btn>
          <v-btn color="black" class="white--text" block :to="{name: 'noticias'}">Noticias</v-btn>
          <v-btn color="black" class="white--text" block :to="{name: 'juegos'}">Premios</v-btn>
          <v-btn v-if="logged" color="black" class="white--text" block :to="{name: 'mapa'}">Mapa</v-btn>
          <v-btn color="black" class="white--text" block :to="{name: 'about'}">About</v-btn>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "./views/Footer";
import { auth } from "./firebase";
import store from "vuex"

export default {
  name: "App",
  components: {
    Footer
  },
  data() {
    return {
      drawer: false,
      showtool: true,
      isLogged: false,
      currentUser: false
    };
  },
  created() {
    if (auth.currentUser) {
      this.isLogged = true;
      this.currentUser = auth.currentUser.email;
    }
  },
  methods: {
    logout() {
      auth.signOut().then(() => {
        this.$store.dispatch("setLogged", false)
        this.$router.push("/login")
        });
    }
  },
  computed:{
    
    logged: function () {
      return this.$store.getters.getIsLogged ? true : false
    },

    isAdmin: function () {
      return this.$store.getters.getIsLogged && this.$store.getters.getUser.email === 'admin@admin.com' ? true : false
    }
  }
};
</script>
<style>
#bg {
  background-image: url("./assets/background-black.jpg");

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

#showtool {
  display: none;
}
#dibujaEsto {
  display: none;
}

@media screen and (max-width: 600px) {
  #showtool {
    display: block;
  }
  #showtool1 {
    display: none;
  }
  #dibujaEsto {
    display: block;
  }
}
</style>
