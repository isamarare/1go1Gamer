<template>
  <v-container grid-list-lg text-xs-center>
      <v-layout row wrap justify-center>
          <v-flex xs12 >
            <v-card-text class="white--text"><h1>USUARIOS EN TU ZONA:</h1></v-card-text>
            <v-card id="borde">
              
      <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
            </v-card>
          </v-flex>
      </v-layout>
    </v-container>  
</template>

<script>
import {db} from '../firebase'
export default {
  name: "GoogleMap",
  data() {
    return {
      
      center: { lat: 45.508, lng: -73.587 },
      markers: [{position: {lat: 37.3828300, lng: -5.9731700}}, {position: {lat: 37.3028300, lng: -5.9731700}}, {position: {lat: 37.5526521, lng: -5.9648108}}  ],
      places: [],
      currentPlace: null,
      usuarios: []
    };
  },
  
  mounted() {
    this.geolocate();
    
  },

  methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
        //calcDistance (fromLat, fromLng, toLat, toLng) {
     // return google.maps.geometry.spherical.computeDistanceBetween(
       // new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
  //},
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  created(){
    db.collection('Usuarios').onSnapshot(res =>{
      const changes = res.docChanges();

      ///checking if added
      changes.forEach(change => {
        if(change.type === 'added'){
          this.usuarios.push({
            ...change.doc.data(),
            id: change.doc.id
            
          })
        }
      })
    })
  }
};
</script>

<style>
#borde{
  border: 5px solid grey;
}
</style>





