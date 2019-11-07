<template>
<v-container grid-list-lg >
  <v-layout row wrap justify-center>
    <v-flex   xs12  sm8 md6  >
      <v-card class="hovercard backg">
        <v-toolbar-title dark>NOTICIAS</v-toolbar-title>
        <router-link :to="{name: 'noticias'}"><v-img src="http://fox-grove.com/wp-content/uploads/2014/12/black-polygon-with-red-edges-abstract-hd-wallpaper-1920x1080.jpg"
          aspect-ratio="1.9">
       
          </v-img>
          </router-link>
        
      </v-card>
    </v-flex>

    <v-flex  xs12  sm8 md6 >
      <v-card class="hovercard backg">
        <v-toolbar-title dark>PREMIOS</v-toolbar-title>
        <router-link :to="{name: 'juegos'}"><v-img src="http://fox-grove.com/wp-content/uploads/2014/12/black-polygon-with-red-edges-abstract-hd-wallpaper-1920x1080.jpg"
          aspect-ratio="1.9">
       
          </v-img>
          </router-link>
        
      </v-card>
    </v-flex>

    <v-flex  xs12  sm8 md6  >
      <v-card class="hovercard backg">
        <v-toolbar-title dark>QUIENES SOMOS</v-toolbar-title>
        <router-link :to="{name: 'about'}"><v-img src="http://fox-grove.com/wp-content/uploads/2014/12/black-polygon-with-red-edges-abstract-hd-wallpaper-1920x1080.jpg"
          aspect-ratio="1.9">
        
          </v-img>
          </router-link>
        
      </v-card>
    </v-flex>

    <v-flex  xs12  sm8 md6 >
      <v-card class="hovercard backg">
        <v-toolbar-title dark>REGISTRO</v-toolbar-title>
        <router-link :to="{name: 'register'}"><v-img src="http://fox-grove.com/wp-content/uploads/2014/12/black-polygon-with-red-edges-abstract-hd-wallpaper-1920x1080.jpg"
          aspect-ratio="1.9">
     
          </v-img>
          </router-link>
        
      </v-card>
    </v-flex>    
  </v-layout>
  
</v-container>
</template>

<script>
  

  export default {
      data(){
        return{
          dialog: false
        }
      }
  }
</script>

<style scoped>
  .hovercard:hover{
    background: red;
    transition: 0.2s;
    transform: scale(1);
   border: 5px solid red;
   
  }

  .backg{
    background: black;
  }
  
</style>
