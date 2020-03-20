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
      <transition name="bounce">
        <!-- <md-button v-if="mostraBtUpload" class="md-round md-info" v-bind:class="{ disabled: !image }" @click="upload()"> -->

          <md-icon>add</md-icon>
          Upload
        </md-button>
      </transition>  
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
        idUsuario: null,
        nome: null,
        profissao: null,
        sobre: null
      },
      image: null,
      mostraBtUpload: false
    };
  },
  created(){
    this.getUsuario()
  },
  components: {
    PictureInput
  },
  methods: {
    getUsuario(){
       this.usuario = this.$localStorage.get('usuario')
    },
    upload(){
      let self = this
      this.mostraBtUpload = false;

       console.log("FOIIII " + this.image)

      /*
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
      */

    },
    onChanged() {
      this.image = this.$refs.pictureInput.file;
      this.mostraBtUpload = true;
    }
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
