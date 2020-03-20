<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
         <img :src="this.imagem" alt="" >  
     
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
      <h6 class="category text-gray"></h6>
      <h4 class="card-title"></h4>
      <p class="card-description">
   
      </p>
      <transition name="bounce">
         <md-button v-if="mostraBtUpload" class="md-round md-info" v-bind:class="{ disabled: !image }" @click="upload()"> 

          <md-icon>cloud_upload</md-icon>
          Upload
        </md-button>
      </transition>  
     </md-card-content>
  </md-card>
</template>
<script>
import PictureInput from 'vue-picture-input'
export default {
  name: "company-card",
  data() {
    return {
      idEmpresa: null,
      image: null,
      mostraBtUpload: false
    };
  },
  created(){
   
     this.idEmpresa = this.$route.params.idEmpresa;
     this.getImagemEmpresa()

  },
  components: {
    PictureInput
  },
  methods: {
    
    upload(){
      let self = this
      this.mostraBtUpload = false;

      console.log("FOIIII " + this.image)
      var formData = new FormData();
      formData.append("idEmpresa",  this.idEmpresa );
      formData.append("fotoEmpresa", this.image);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Accept':'*'
        }
      };

      this.$http.post('/empresa/upload',formData, config)
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


    },
    getImagemEmpresa(){

      if( this.idEmpresa != null ){

         let self = this
         this.$http.get('/empresa/download/'+this.idEmpresa)    
          .then(function(response) {
            //console.log(response.data.conteudo)
            //self.$refs.pictureInput.image = 
            //self.$refs.pictureInput.image = 'data:image/jpg;base64,'+response.data.conteudo;
   
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
      }
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
