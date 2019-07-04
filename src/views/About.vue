<template>
  <v-container grid-list-lg text-xs-center>
      <v-layout row wrap justify-center>
          <v-flex xs12>                 
            <v-card-text class="white--text">
                    <h1>ABOUT US:</h1>
                    </v-card-text>
          </v-flex>
          <v-flex xs12 >
            <v-card-title class=" white--text"><h2>¿Quiénes somos?</h2></v-card-title>
            <v-card id="borde">
                
                <v-card-text class="blanco" id="borde">Bienvenidas y bienvenidos a <strong>1vs1GG</strong>. Somos el equipo que está detrás y vamos a presentarnos debidamente.
                  Este proyecto nace debido a la naturaleza del gamer. El gamer es un ser social, ansioso por conocer nuevos gamers a los que enfrentar, con los que 
                  jugar y con los que conseguir metas. Desde subir de división en tu juego favorito a realizar una proeza en alguna ronda, cuenta la skill individual
                  aunque prime el trabajo en equipo. Desde 1vs1GG sabemos ésto y por ello queremos hacer hincapié en el individuo. Si quieres probar un juego nuevo o medir
                  tus habilidades con gente de mejor nivel que el tuyo o parecido, primero hay que encontrarlos. <br>

                  Somos ya muchos y estamos por todas partes. Pero faltaba la herramienta necesaria para conectarnos más allá del juego. Eso es 1vs1GG.
                   
                </v-card-text>
     
            </v-card>
            
          </v-flex>
    
<v-flex xs12>
  <v-card-title class=" white--text"><h2>¿Por qué 1vs1GG?</h2></v-card-title>
  <v-card id="borde">

                <v-card-text class="blanco" id="borde"> 1vs1GG es una aplicación web que basada en la geolocalización muy precisa. 
                  Hemos focuseado la exactitud, pulido nuestras armas y hemos ido al campo de batalla. Es una manera de encontrar a esos vecinos que no sabías 
                  o que no conocías y que juegan a lo mismo que tú. Rétalos en duelos 1vs1 con vuestros stats haciendo de hechos, y que éstos hablen por sí solos. Comunícate con ellos 
                  y aprende, mejora en el juego, vuelve y consigue esa ansiada revancha pero sobre todo... <strong>¡Podrás ganar premios fantásticos!</strong>
                </v-card-text>
                </v-card>
</v-flex>

    <v-flex xs12 >
            <v-card-title class=" white--text"><h2>Contacto:</h2></v-card-title>
            <v-card id="borde">
                
                <v-card-text class="blanco" id="borde">
                  Abajo en la página podéis ver nuestra presencia en RRSS. Estamos en todas partes como Rosalía. No te cortes y comparte con nosotros
                  tu experiencia con la web, tus duelos, opiniones y/o ideas. Desde 1vs1GG estamos abiertos a cualquier tipo de feedback, propuestas 
                  locas o críticas negativas pues lo que ansiamos es 
                  mejorar día a día para llegar a ser los mejores, ¡LOS MEJORES QUE HABRÁ JAMAS! (lo sentimos, somos muy frikis). <br>
                  Si lo que queréis es ponerse en contacto de manera directa tenemos a vuestra disposición el siguiente correo electrónico: <br>
                  <strong>info@1vs1gg.com.</strong>
                </v-card-text>
     
            </v-card>
            
          </v-flex>

    <v-flex><v-btn :to="{name: 'register'}" class="warning">Regístrate</v-btn></v-flex>

        <v-flex xs12> 
          
          <img src="https://media.giphy.com/media/XVR9lp9qUDHmU/giphy.gif" alt="" style="width: 50%">
          
          </v-flex>
      </v-layout>
    </v-container>  
</template>


<script>

export default {
  data() {
    return {
      gif: [],
      gifSrc:'',
      search: 'game',
      valid: '',
      sumLevel: '',
      sumName: ''
    }
  },

}
</script>

<style>
#borde{
  border: 5px solid grey;
}
</style>

