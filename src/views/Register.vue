<template>
      <v-container fluid fill-height>
        <v-layout  justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="black">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              
              </v-toolbar>
              <v-card-text>
                <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation
                    >
                        <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        ></v-text-field>

                           <v-text-field
                        v-model="password"
                        :counter="10"
                        :rules="passwordRules"
                        label="Password"
                        required
                        ></v-text-field>

                        <v-text-field
                        v-model="gameName"
                        
                       
                        label="LoL nickname"
                        required
                        ></v-text-field>

                        <v-checkbox
                        v-model="checkbox"
                        :rules="[v => !!v || 'Acepta las condiciones!']"
                        label="Aceptas las condiciones de uso y nos das tu alma."
                        required
                        ></v-checkbox>

                        <v-btn
                        :disabled="!valid"
                        color="warning"
                        @click="validate"
                        >
                        Validar
                        </v-btn>

                        <v-btn
                        color="secondary"
                        @click="reset"
                        >
                        Reset
                        </v-btn>
                        
                    </v-form>
              </v-card-text>
            
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

</template>

<script>

import {auth} from '../firebase'
import {db} from '../firebase'
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Introduce una contraseña',
        v => (v && v.length <= 10) || 'Tiene que tener menos de 10 carácteres'
      ],
      email: '',
      emailRules: [
        v => !!v || 'Introduce tu e-mail',
        v => /.+@.+/.test(v) || 'El E-mail debe ser válido'
      ],
      gameName: '',
      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
      
      db.collection("Usuarios").add({
         email: this.email,
         password: this. password,
         gameName: this.gameName,
         coins: '0'
      })
      .then(function() {
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });

      auth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((user)=> alert('usuario registrado'),this.$router.push('login'), (error) => alert(error.message))
      }
        
      },
      reset () {
        this.$refs.form.reset()
      }
    }
  }
</script>
