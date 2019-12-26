<template>
    <div>
        <div class="modal">
        <mdb-modal>
            <notifications></notifications>
            <md-card class="md-card-plain">
                <md-card-header>
                    <h4 class="title text-center"><strong>Logar</strong></h4>
                </md-card-header>
                <md-card-content>
                 
                    <div class="md-layout-item md-size-100">
                        <md-field>
                            <label>Email</label>
                            <md-input v-model="login.email" type="email"></md-input>
                        </md-field>
                        <md-field>
                            <label>Senha</label>
                            <md-input v-model="login.senha" type="password"></md-input>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-size-100">
                        <p>Esqueceu <a href="#" @click="esqueceuSenha();">Senha?</a></p>
                    </div>
                    <div class="md-layout-ite md-size-100 text-right">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        
                        <md-button class="md-round md-info" @click="logar()" >
                            <md-icon>thumb_up</md-icon>
                            Entrar 
                        </md-button>
                    </div>

                </md-card-content>
                <footer class="footer">
                    <div class="md-layout-item md-size-100 text-right">
                        <p>Não é um membro? <a href="#/registro"> Inscrever-se</a></p>
                    </div>
                </footer>
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
    name: 'login',
    components: {
      mdbModal
    },
    data() {
      return {
        showModal: false,
        login:{
            email: null,
            senha: null
        }
      };
    },
    created(){
         this.usuario = this.$localStorage.clear()
    },
    methods: {

        esqueceuSenha(){
         
            let self = this
            if( this.login == null || this.login.email == null || this.login.email == "" ){
                console.log( "Campo em branco" )
                self.$notify({
                    message:
                        "Favor preencher o email",
                        icon: "add_alert",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'warning'
                    });
            }else{
               
                this.$http.post('/login/esqueceuSenha',
                    this.login
                )    
                .then(function(response) {
                    self.$notify({
                        message:
                        "Email de alteração de senha enviado",
                        icon: "add_alert",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'success'
                    });
                }).catch(e => {
                    console.log( "ERRO NO LOGIN " +e )
                    self.$localStorage.clear()
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
        logar(){

            let self = this
            if( this.login == null || this.login.email == null || this.login.senha == null
            || this.login.email == "" || this.login.senha == "" ){
                console.log( "Campo em branco" )
                self.$localStorage.clear()
                self.$notify({
                    message:
                        "Favor preencher todos os campos",
                        icon: "add_alert",
                        horizontalAlign: 'center',
                        verticalAlign: 'top',
                        type: 'warning'
                    });
            }else{
               
                this.$http.post('/login/session',
                    this.login
                )    
                .then(function(response) {
                    self.$localStorage.set('usuario', response.data)
                    self.$router.push('maps') 
                }).catch(e => {
                    console.log( "ERRO NO LOGIN " +e )
                    self.$localStorage.clear()
                    this.$notify({
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

