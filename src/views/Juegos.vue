<template>
<v-container grid-list-lg text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 >
            <material-card>
                <v-card-text class="white--text">
                    <h1>CANJEA TUS COINS POR PREMIOS:</h1>
                    </v-card-text>
            </material-card>
          </v-flex>
       <v-flex xs6 sm4 >
      <v-card id="borde">
        <v-img
          src="https://i.pinimg.com/originals/f2/d8/5c/f2d85c0ead75501fe94c08675d3f61a3.jpg"
          aspect-ratio="1.5"
        ></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=true" class="warning">10c</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs6 sm4 >
      <v-card id="borde">
        <v-img
          src="https://i.pinimg.com/originals/f2/d8/5c/f2d85c0ead75501fe94c08675d3f61a3.jpg"
          aspect-ratio="1.5"
        ></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=true" class="warning">25c</v-btn>
         
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs6 sm4 >
      <v-card id="borde">
        <v-img
          src="https://i.pinimg.com/originals/f2/d8/5c/f2d85c0ead75501fe94c08675d3f61a3.jpg"
          aspect-ratio="1.5"
        ></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=true" class="warning">5c</v-btn>
          
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs6 sm4 >
      <v-card id="borde">
        <v-img
          src="https://i.pinimg.com/originals/f2/d8/5c/f2d85c0ead75501fe94c08675d3f61a3.jpg"
          aspect-ratio="1.5"
        ></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=true" class="warning">1c</v-btn>

         
        </v-card-actions>
      </v-card>
    </v-flex>
    
     <v-flex xs6 sm4 >
      <v-card id="borde">
        <v-img
          src="https://i.pinimg.com/originals/f2/d8/5c/f2d85c0ead75501fe94c08675d3f61a3.jpg"
          aspect-ratio="1.5"
        ></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=true" class="warning">1c</v-btn>
          
          
        </v-card-actions>
      </v-card>
    </v-flex>

     <v-flex xs6 sm4 >
      <v-card id="borde">
        <v-img
          src="https://i.pinimg.com/originals/f2/d8/5c/f2d85c0ead75501fe94c08675d3f61a3.jpg"
          aspect-ratio="1.5"
        ></v-img>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=true" class="warning">1c</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    
    </v-layout>

    <!--dialog-->
    <v-dialog v-model="dialog" width="600px">
      <v-card>
        <v-card-title>Hello there, gamer:</v-card-title>
        <v-card-text>Esta función no está aún implementada. Muy pronto estará disponible, prometido :D</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog=false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--/dialog-->


</v-container>  
</template>

<script>
  export default {
    data () {
      return {
        dialog: false
      }
    }
  }
</script>

<style>
#borde{
  border: 5px solid grey;
}
</style>