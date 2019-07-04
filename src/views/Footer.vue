<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      flat
      tile
      class="black lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 red--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      
      <v-card-text class="white--text pt-0">
        Política de privacidad de la empresa. Usamos cookies. Sabemos que esto es un coñazo y no lo vas a leer. Pero por si acaso ahí va: Te queremos mucho por usar nuestra App y te damos las gracias por pertenecer a la comunidad
        gamer más molona del mundo mundial. Todos los derechos no están registrados. Ni siquiera tenemos normas sobre cuántas veces puedes apalizar al mismo
        pobre player de tu zona.
        No obstante, abstente de hacer trampas que somos bronce II en soloQ. Nos vemos en la grieta, invocador.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="red--text">
        &copy;2019 — <strong>1vs1GG</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fa fa-facebook',
        'fa fa-twitter',
        'tab',
        'fa fa-instagram'
      ]
    })
  }
</script>

