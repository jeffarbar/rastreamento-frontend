<template>
 <div>
 <div class="modal">
    <mdb-modal>
      <notifications></notifications>
      <md-card class="md-card-plain">
        <md-card-header>
                <h4 class="title text-center"><strong>Inscrever-se</strong></h4>
        </md-card-header>
        <md-card-content>
              
          <div class="md-layout-item md-size-100">
            <md-field>
              <label>Nome</label>
              <md-input
               v-model="registra.nome"
               name="nome"
               type="text"></md-input>
            </md-field>
         
            <md-field>
              <label>Email</label>
              <md-input v-model="registra.email" 
               type="email" 
               name="email">
              </md-input>
            </md-field>
         
            <md-field>
              <label>Senha</label>
              <md-input v-model="registra.senha" type="password" ></md-input>
            </md-field>
         
            <md-field>
              <label>Confirmar senha</label>
              <md-input v-model="registra.confirmarSenha" type="password" ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
              <md-button class="md-round md-info" href="#/login">
                <md-icon>home</md-icon>
                  Voltar 
              </md-button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <md-button class="md-round md-info" @click="registrar()">
                <md-icon>thumb_up</md-icon>
                  Salvar 
              </md-button>
          </div>
        </md-card-content>
      </md-card>
     </mdb-modal>
  </div>
   <div class="copyright" >
      &copy; {{ new Date().getFullYear() }}
      powered by Send Solutions<br>
      contato@sendsolutions.me
    </div>
 </div>
</template>
  
<script>

  import { mdbModal } from 'mdbvue';
  export default {
    name: 'registro',
    components: {
      mdbModal
    },
    data() {
      return {
        required: null,
          registra:{
              nome: null,
              email: null,
              senha: null,
              confirmarSenha: null
          }
      };
    },
    methods: {
        registrar(){

          let self = this
          if( this.registra == null || this.registra.nome == null || this.registra.email == null 
             || this.registra.senha == null || this.registra.nome == "" || this.registra.email == "" 
             || this.registra.senha == "" ){

            self.$notify({
              message:
                    "Campos obrigatórios",
                    icon: "add_alert",
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'warning'
                }); 

          }else if(this.registra.senha != this.registra.confirmarSenha){

              self.$notify({
                message:
                    "Senhas não condizem",
                    icon: "add_alert",
                    horizontalAlign: 'center',
                    verticalAlign: 'top',
                    type: 'warning'
                });

            }else{

                this.$http.post('/usuario/',
                    this.registra
                )    
                .then(function(response) {
                    self.$router.push('login') 
                    self.$notify({
                        message:
                        "Registro realizado com sucesso",
                        icon: "add_alert",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                    });
                }).catch(e => {
                    console.log( 'ERR ' + e )
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
<style>
.copyright{
    text-align: center;
    padding: 50px 40%;
}
</style>