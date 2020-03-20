<template>

  <div>
    <div class="md-layout-ite md-size-100 text-right">
      <md-button class="md-round md-info" @click="incluir()">
        <md-icon>add</md-icon>
          Incluir 
      </md-button>
    </div>

    <md-table v-model="listaUsuario" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Perfil">{{ item.descricao }}</md-table-cell>
        <md-table-cell md-label="Empresa">{{ item.razaoSocialEmpresa }}</md-table-cell>
        <md-table-cell md-label="Data Cadastrada">{{ item.dtCadastro }}</md-table-cell>

          <md-table-cell md-label="Ação">
          <md-button class="md-just-icon md-simple md-primary" @click="editar(item.idUsuario)" >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Editar</md-tooltip>
          </md-button>
          <md-button v-if="!item.admin" class="md-just-icon md-simple md-danger"  @click="remover(item.idUsuario)" >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">Remover</md-tooltip>
          </md-button>
        </md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>

import { mdbModal } from 'mdbvue';

export default {
  
  name: "user-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  created(){
    let usuario = this.$localStorage.get('usuario')
    this.getUsuario(usuario.idUsuario)
  },
  data() {
    return {
      listaUsuario: []
    };
  },
  methods: {
       
    getUsuario(idUsuario){

      let self = this
      this.$http.get('/usuario/all/' + idUsuario)    
      .then(function(response) {
        self.listaUsuario = response.data;
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
    incluir(){
          this.$router.push('/usuario') 
    },
    editar(idUsuario){
          this.$router.push('/usuario/'+idUsuario) 
    },
    remover(idUsuario){
      let self = this
      this.$http.delete('/usuario/'+ idUsuario)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.getUsuario();
        self.$notify({
            message:
              "Empresa deletado com sucesso",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'success'
          });
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
  }
}
</script>