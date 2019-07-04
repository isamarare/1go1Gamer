<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12 text-xs-center> <h1 class="white--text">Admin: {{email}}</h1></v-flex>
                        <v-flex xs12 text-xs-left> <h2 class="white--text">Lista de usuarios: </h2></v-flex>

            <v-flex md6>
                 <v-card v-for="usuario in usuarios" :key="usuario.id">
                <v-card-text>{{usuario.email}}</v-card-text>
                <v-card-text>{{usuario.id}}</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="select(usuario.id)" color="secondary">Eliminar</v-btn>
                </v-card-actions>
                 </v-card>
            </v-flex>
            <v-flex md6 v-if="!formAgregar"> 
                <v-card class="mb-3 pa-3">
                    <v-form @submit.prevent="editNews">
                        <v-text-field label="titulo noticia" v-model="titulo"></v-text-field>
                        <v-textarea label="cuerpo noticia" v-model="descripcion"></v-textarea>
                        <v-btn color="warning" type="submit">Edit</v-btn>
                    </v-form>
                </v-card>
            </v-flex>
            <v-flex md6 v-if="formAgregar">
                <v-card class="mb-3 pa-3">
                    <v-form @submit.prevent="agregarNews">
                        <v-text-field label="titulo noticia" v-model="titulo"></v-text-field>
                        <v-textarea label="cuerpo noticia" v-model="descripcion"></v-textarea>
                        <v-btn color="green" class="white--text" type="submit">Agregar Noticia</v-btn>
                    </v-form>
                </v-card>
            </v-flex>
                        <v-flex md6>

            </v-flex>
            <v-flex md6>
                <v-card class="mb-3" v-for="(item, index) in listaNoticias" :key="index">
                    <v-card-text>
                        <v-chip label color="orange" text-color="white" class="ml-0">
                            <v-icon left>label</v-icon> {{item.titulo}}
                        </v-chip>
                        <p>{{item.descripcion}}</p>
                    </v-card-text>
                    <v-btn color="warning" @click="editarNews(index)">Editar</v-btn>
                    <v-btn color="secondary" @click="eliminarNews(item.id)">Borrar</v-btn>
                </v-card>
            </v-flex>

        </v-layout>


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

import {db} from '../firebase'
import {auth} from '../firebase'
export default {
    data(){
        return{
            listaNoticias: [],
            titulo:'',
            descripcion:'',
            snackbar: false,
            mensaje: '',
            email: '',
            formAgregar: true,
            indexTarea:'',
            loading: false,
            usuarios: []
        }
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
        this.email = auth.currentUser.email;
        if(this.email != 'admin@admin.com' ){
        this.$router.push("/login")
    }
      });
    });
  },
    methods:{
        select(id){
            db.collection("Usuarios").doc(id).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            this.usuarios = this.usuarios.filter( usuario => usuario.id != id)
        },
        agregarNews(){
           // console.log(this.titulonews, this.cuerponews)
            if(this.titulo==='' || this.descripcion===''){
               this.snackbar= true
               this.mensaje= 'llena todos los campos'
            }else{
                this.loading= true;
                this.listaNoticias.push({
                    id: Date.now(),
                    titulo: this.titulo,
                    descripcion: this.descripcion
                })
       
                 const news = {
                     titulo: this.titulo,
                     cuerpo: this.descripcion,
                    }

                db.collection('Noticias').add(news).then(() => {
                    this.loading= false;
                })
                this.titulo=''
                this.descripcion=''
                this.snackbar= true
                this.mensaje= 'noticia añadida correctamente'
            }
        },
        eliminarNews(id){
            //console.log(id)
            this.listaNoticias = this.listaNoticias.filter( noticia => noticia.id != id)
        },
        editarNews(index){
            this.formAgregar= false
            this.titulo= this.listaNoticias[index].titulo
            this.descripcion= this.listaNoticias[index].descripcion
            this.indexTarea = index
        },
        ///una vez editamos necesitamos otro método edit para pillar la tarea concreta y pushear esa
        //para ello hemos creado un indexTarea que pasamos a la lista para verificar
        //se quedaba formAgregar false, hay que volver a ponerlo true
        editNews(){
            this.listaNoticias[this.indexTarea].titulo = this.titulo
            this.listaNoticias[this.indexTarea].descripcion = this.descripcion
            this.formAgregar = true
            //limpiamos
            this.titulo=''
            this.descripcion=''
            this.snackbar= true
            this.mensaje= 'buen edit máquina'
        }
    }
}
</script>
