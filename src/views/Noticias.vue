<template>
  <v-container fluid  text-xs-center grid-list-lg>
      <v-layout row wrap justify-center>
          <v-flex xs12 >
            <material-card>
                <v-card-text class="white--text">
                    <h1>ULTIMAS NOTICIAS:</h1>
                    </v-card-text>
            </material-card>
          </v-flex>
                <v-flex  xs12 sm6 md8 v-for="noticia in noticias" :key="noticia" >     
             <v-card id="borde">
               <v-card-title class="secondary white--text"><h2>{{noticia.titulo}}</h2></v-card-title>
               <v-card-text class="blanco">
                     {{noticia.cuerpo}}
                    </v-card-text>
                    
                </v-card>
              </v-flex>
      </v-layout>
    </v-container>  
</template>

<script>
import {db} from '../firebase'

export default {
  data(){
    return{
      noticias: []
    }
  },
  created(){
    db.collection('Noticias').onSnapshot(res =>{
      const changes = res.docChanges();

      ///checking if added
      changes.forEach(change => {
        if(change.type === 'added'){
          this.noticias.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
  }
}
</script>

<style>
#borde{
  border: 5px solid grey;
}
</style>