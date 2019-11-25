<template>
   <div class="modal">
        <mdb-modal>
            <notifications></notifications>
             <md-card class="md-card-plain">
                <md-card-header>
                    <h4 class="title text-center"><strong>Alterar Senha</strong></h4>
                </md-card-header>
                <md-card-content>
                 
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <label>Senha</label>
                            <md-input v-model="resetSenha.senha" type="password" icon="lock"></md-input>
                        </md-field>
                         <md-field>
                            <label>Confirmar Senha</label>
                            <md-input v-model="resetSenha.confirmarSenha" type="password" icon="lock"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-ite md-size-100 text-right">
                        <md-button class="md-round md-info" href="#/login">
                          <md-icon>home</md-icon>
                            Voltar 
                        </md-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <md-button class="md-round md-info" @click="alterar()" >
                            <md-icon>cached</md-icon>
                            Alterar 
                        </md-button>
                    </div>

                </md-card-content>
            </md-card>
        </mdb-modal>
    </div>
</template>

<script>
  import { mdbModal } from 'mdbvue';
  export default {
    name: 'login',
    components: {
      mdbModal
    },
    data() {
      return {
        showModal: false,
        resetSenha:{
            chaveTroca: null,
            senha: null,
            confirmarSenha:null
        }
      };
    },

    methods: {
      alterar() {

        this.resetSenha.chaveTroca = this.$route.params.chave;

        console.log( ">"+this.resetSenha.senha +"<>"+ this.resetSenha.confirmarSenha+"<" )
        let self = this
        if( this.resetSenha == null || this.resetSenha.senha == null || this.resetSenha.confirmarSenha == null 
         || this.resetSenha.chaveTroca == null || this.resetSenha.senha == "" || this.resetSenha.confirmarSenha == "" 
         || this.resetSenha.chaveTroca == "" ){

          self.$notify({
            message:
                "Campos obrigatórios",
                icon: "add_alert",
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'warning'
            }); 

        }else if(this.resetSenha.senha != this.resetSenha.confirmarSenha){

          self.$notify({
            message:
                "Senhas não condizem",
                icon: "add_alert",
                horizontalAlign: 'center',
                verticalAlign: 'top',
                type: 'warning'
            });
        }else{
      
          this.$http.post('/usuario/alterarSenha/',
            this.resetSenha
          )    
          .then(function(response) {
            self.$router.push('/login')
            self.$notify({
                message:
                  "Senha alterada com sucesso",
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
    }
  }
}
</script>

