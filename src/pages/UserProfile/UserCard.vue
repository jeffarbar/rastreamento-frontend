<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img src="./../../assets/img/profile.png" alt=""> 
      <!--
       <picture-input
         ref="pictureInput"
         size="1"
         @change="onChanged"
         accept="image/jpeg, image/jpg ,image/png"
         :customStrings="{
           upload: '<h1>Carregar!</h1>',
           drag: 'Arraste e solte sua imagem aqui'
         }"
       >
       </picture-input>
       -->
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{usuario.profissao}}</h6>
      <h4 class="card-title">{{usuario.nome}}</h4>
      <p class="card-description">
          {{usuario.sobre}}
      </p>
      <md-field v-if="usuario.admin && usuario.razaoSocialEmpresa != null">
          
        <label>Empresa</label>
          <md-input v-model="usuario.razaoSocialEmpresa" type="text" disabled ></md-input>
        </md-field>
        
        <md-field v-else>
            
          <label>Empresa</label>
          <md-select
            v-model="usuario.idEmpresa" 
            @md-selected="salvaEmpresa()"
          >
              <md-option v-for="item in listaEmpresa" :value="item.idEmpresa" >{{item.razaoSocial}}</md-option>
          </md-select>

      </md-field>
      <!--
      <transition name="bounce">
        <!-- <md-button v-if="mostraBtUpload" class="md-round md-info" v-bind:class="{ disabled: !image }" @click="upload()"> -->

<!--
          <md-icon>add</md-icon>
          Upload
        </md-button>
      </transition>  
      -->
     </md-card-content>
  </md-card>
</template>
<script>
import PictureInput from 'vue-picture-input'
export default {
  name: "user-card",
  data() {
    return {
      usuario: {
        idEmpresa: null,
        idUsuario: null,
        nome: null,
        profissao: null,
        sobre: null,
        admin:null,
        razaoSocialEmpresa:null
      },
      image: null,
      mostraBtUpload: false,
      listaEmpresa: []
    };
  },
  created(){

     if( this.$route.path != '/usuario'){ 

      let idUsuario = this.$route.params.idUsuario;
      if(idUsuario != null){
        this.getUsuario(idUsuario)
      }else{
        this.usuario = this.$localStorage.get('usuario')
      }
    }
    this.getEmpresa()
  },
  components: {
    PictureInput
  },
  methods: {

    getUsuario(idUsuario){

      let self = this
      this.$http.get('/usuario/' + idUsuario)    
      .then(function(response) {
        self.usuario = response.data;
      }).catch(e => {
          self.$notify({
          message:
              "Lamentamos, mas ocorreu um erro na sua solicitação",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'danger'
          });
      })
    },
    salvaEmpresa(){

      console.log('Altera empresa ' + this.usuario.idEmpresa) 
      if( this.usuario.idEmpresa != null ) {   
        let self = this
        this.$http.put('/usuario/',
          this.usuario
        )    
        .then(function(response) {
          //self.$localStorage.set('usuario', self.usuario)
          self.$notify({
            message:
              "Dados alterados com sucesso",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
          });
        }).catch(e => {
          console.log( e )
          self.$notify({
            message:
              "Lamentamos, mas ocorreu um erro na sua solicitação",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'danger'
          });
        })
      }
    },
    getEmpresa(){
      let self = this
      this.$http.get('/empresa/')    
      .then(function(response) {
        self.listaEmpresa = response.data;
      }).catch(e => {
          self.$notify({
          message:
              "Lamentamos, mas ocorreu um erro na sua solicitação",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'danger'
          });
      })
    },
    onChanged() {
      this.image = this.$refs.pictureInput.file;
      this.mostraBtUpload = true;
    }
     /*
    upload(){
      let self = this
      this.mostraBtUpload = false;

       console.log("FOIIII " + this.image)

     
      var formData = new FormData();
      formData.append("idUsuario", this.usuario.idUsuario);
      formData.append("fotoPerfil", this.image);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Accept':'*'
        }
      };
      this.$refs.pictureInput.image="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
      this.$http.post('/usuario/upload',formData, config)
      .then(function(response) { 
         console.log("FOIIII " + response.data)
          self.$notify({
            message:
              "Upload realizado com sucesso",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
          });
      }).catch(e => {
          console.log( e )
          self.$notify({
            message:
              "Lamentamos, mas ocorreu um erro na sua solicitação",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'danger'
          });
      })
    },  */
   
  }
};
</script>
<style>

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>
