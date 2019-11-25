<template>
  <form>
    <md-card>
      <md-card-header>
        <h4 class="title">Perfil</h4>
        <p class="category">Complete seu perfil</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
        
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nome</label>
              <md-input v-model="usuario.nome" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email</label>
              <md-input v-model="usuario.email" type="email"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Companhia</label>
              <md-input v-model="usuario.companhia" type="text" ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Profissão</label>
              <md-input v-model="usuario.profissao" type="text" ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Senha</label>
              <md-input v-model="usuario.senha" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Confrmar Senha</label>
              <md-input v-model="usuario.confirmarSenha" type="password"></md-input>
            </md-field>
          </div>
  
          <div class="md-layout-item md-size-100">
            <md-field maxlength="5">
              <label>Conte-nos sobre você</label>
              <md-textarea v-model="usuario.sobre"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-round md-info" @click="salva()" >
              <md-icon>thumb_up</md-icon>
              Salvar 
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>


export default {
  name: "edit-profile-form",
  
  data() {
    return {
      usuario: {
          nome: null,
          email: null,
          profissao: null,
          companhia: null,
          senha: null,
          confirmarSenha: null,
          sobre: null
      }
    };
  },
  created(){
    this.usuario = this.$localStorage.get('usuario')
  },
  methods: {
    salva() {
      console.log( ">"+this.usuario.senha +"<>"+ this.usuario.confirmarSenha+"<" )
      let self = this
      if( this.usuario == null || this.usuario.nome == null || this.usuario.email == null 
        || this.usuario.senha == null || this.usuario.nome == "" || this.usuario.email == "" 
        || this.usuario.senha == "" ){

          self.$notify({
          message:
              "Campos obrigatórios",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
          }); 

      }else if(this.usuario.senha != this.usuario.confirmarSenha){

        self.$notify({
          message:
              "Senhas não condizem",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
          });
      }else{
      
        this.$http.put('/usuario/',
          this.usuario
        )    
        .then(function(response) {
          self.$localStorage.set('usuario', self.usuario)
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
    }
  }
};
</script>
<style></style>
