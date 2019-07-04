<template>
  <v-container grid-list-lg>
    <v-layout justify-center>
      <v-flex class="secondary" xs12 sm6 id="textArea">
        <material-card class="v-card-profile">
          <v-avatar slot="offset" class="mx-auto d-block" size="150">
            <img src="http://i63.tinypic.com/2eqgpll.png" style="border: 2px solid red;" />
          </v-avatar>
          <v-card-text class="text-xs-center">
            <h2 class="card-title text-xs-center">{{email}} ({{nickName}})</h2>
            <h3>Coins: {{coins}} </h3>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-text class="text-xs-center">
            <!--Description & Geolocation-->
            <p
              class="card-description white--text"
            >En dos sencillos pasos estarás buscando oponente.
            Paso 1. Activa y localízate pulsando el siguiente botón:</p>
            <v-btn @click="geoFindMe()" class="warning">Find ME</v-btn>
            <p id="status"></p>
            <a id="map-link" target="_blank">Posición Actual</a>
            <!--/Geolocation-->
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="text-xs-center">
            <!--STATS-->
            <v-card-text>
              <img src="../assets/bwl.png" />
            </v-card-text>
            <p
              class="card-description white--text"
            >Paso 2. Ya que sabemos donde andas, es hora de averiguar tus datos de juego:</p>
            <v-btn class="warning" @click.native="getLol()">Get stats</v-btn>
            <v-card-text><h2>{{sumName}}</h2></v-card-text>
            <v-card-text> <h3> Level: </h3> {{sumLevel}}</v-card-text>
            <v-card-text><h3>Wins: </h3> {{wins}}</v-card-text>
            <!--/STATS-->
            
            <p class="card-description white--text">Juega con moderación- Equipo de 1vs1GG.</p>
          </v-card-text>
        </material-card>
      </v-flex>
    </v-layout>

    <v-layout justify-center>
      <v-flex xs12 sm6>
        <v-btn block dark class="warning" @click="dialog=true">Buscar Oponente</v-btn>
      </v-flex>
    </v-layout>

    <!--dialog-->
    <v-dialog v-model="dialog" width="600px">
      <v-card v-for="usuario in usuarios" :key="usuario">
        <v-card-title>Usuario encontrado: </v-card-title>
        <v-card-text>{{usuario.email}} {{usuario.id}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="duel(usuario.id)">Duelo</v-btn>
         
          <v-btn @click="dialog=false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--/dialog-->

    <!--snackbar-->
        <v-snackbar
      v-model="snackbar"
    >
      {{ mensaje }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
    <!--/snackbar-->


  </v-container>
</template>

<script>
import { db } from "../firebase";
import { auth } from "../firebase";
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      usuarios: [],
      password: "",
      email: "",
      sumLevel: "",
      sumName: "",
      nickName: "",
      userId: "",
      lolId: "",
      wins: "",
      coins: 0,
      lati: '',
      longi:'',
      mensaje:'',
      snackbar: false
    };
  },
  created() {

    
    db.collection("Usuarios").onSnapshot(res => {
      const changes = res.docChanges();

      ///checking if added
      changes.forEach(change => {
        if (change.type === "added") {
          this.usuarios.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
    this.email = auth.currentUser.email;
    db.collection("Usuarios")
            .where("email", "==", auth.currentUser.email).get().then( res => {
              
              res.forEach(doc => {
                let gameName = doc.data().gameName;
                let wins = doc.data().wins;
                this.nickName = gameName;
                this.wins = wins;
                this.userId = doc.id;
                this.coins = doc.data().coin;
              })
            })
  },
  methods: {
    duel(id){
      ///aqui dentro tengo que pillar el id del usuario de la lista no de la base de datos?? todo lo que ponga con this no lo pilla
      
       db.collection("Usuarios").doc(id).update({duelo: "duelo"}).then(function() {
                    console.log("¡Ha comenzado un duelo!");
                    ///aqui iba toda esa shit de abajo menos el filter
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
                let user= this.usuarios.filter( usuario => usuario.id == id)[0]
                this.usuarios = this.usuarios.filter( usuario => usuario.id != id)
                
                
                ///y aqui fuera pues no me lee esto. Necesito el segundo puto user con esa id que es donde hago click en duelo.
                let user1= parseInt(user.wins);
                let user2= parseInt(this.wins);

                console.log(user1,user2)
                if(user1 < user2){
                  console.log("ganas")
                  db.collection("Usuarios").doc(this.userId).update({coin: this.coins + 1})
                  this.snackbar= true
                  this.mensaje= 'Has ganado el duelo, toma una monedita' ///coins=coins+1
                  this.coins = this.coins + 1
                }else if(user1 > user2){
                  console.log("pierdes")
                  db.collection("Usuarios").doc(user.id).update({coin: user.coin + 1})
                  this.snackbar= true
                  this.mensaje= 'tu pierde, el otro usuario gana 1 monedita' ///coins=coins+1
                }else{
                  console.log("empate")
                  this.snackbar= true
                  this.mensaje= 'empate'
                }
    },
    geoFindMe() {
      const status = document.querySelector("#status");
      const mapLink = document.querySelector("#map-link");

      let latitud = "";
      let longitud = "";

      function success(position) {
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;
    
        status.textContent = "";

        mapLink.textContent = `Latitud: ${latitud} °, Longitud: ${longitud} °`;
        ///return latitud, longitud;
      }
     
      db.collection("Usuarios")
            .where("uid", "==", this.userId).get().then( res => {
            db.collection("Usuarios").doc(this.userId).update({latitud: latitud,longitud: longitud});
            });

      function error() {
        status.textContent = "Unable to retrieve your location";
      }

      if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
      } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
      }

    
    },

    getLol() {
      const key = "RGAPI-e6a6db77-33b9-4d43-a1f9-ae0a1c0b041c";
      let s_toSearch = this.nickName;
      const URL =
        "RGAPI-262684ea-1338-4946-86f4-8de18ea2162d" +
        s_toSearch +
        "?api_key=" +
        key;
  
      const url2 =
        "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/aH6ngmjzV7N-iLJBbTqjVzeUhCo61sy9IItWJtKdxkbT3SA?api_key=RGAPI-262684ea-1338-4946-86f4-8de18ea2162d";
      

      const url3 =
        "https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/u729ArFcv11zIQNMvxUw95N-E2U4akelv-biM14h1XHHZWE?api_key=RGAPI-262684ea-1338-4946-86f4-8de18ea2162d";
      
      axios.get(URL).then(res => {
        console.log(res.data);
        this.sumLevel = res.data.summonerLevel;
        this.sumName = res.data.name;
        this.lolId = res.data.id;
      });
      
      if(this.nickName == 'isaiasmaister'){
         axios.get(url2).then(res => {
        console.log(res.data);

        this.wins = res.data[0].wins;
      });
      }else{
         axios.get(url3).then(res => {
        console.log(res.data);

        this.wins = res.data[0].wins;
      });
      }
    
    }
  }
};
</script>

<style>
#textArea {
  border-radius: 2em;
}
</style>
