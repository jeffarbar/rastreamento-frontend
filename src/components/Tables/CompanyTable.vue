<template>

  <div>
    <div class="md-layout-ite md-size-100 text-right">
      <md-button class="md-round md-info" @click="incluir()">
        <md-icon>add</md-icon>
          Incluir 
      </md-button>
    </div>

    <md-table v-model="listaEmpresa" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Razão Social">{{ item.razaoSocial }}</md-table-cell>
        <md-table-cell md-label="Cnpj">{{ item.cnpj }}</md-table-cell>
        <md-table-cell md-label="Email Contato">{{ item.emailContato }}</md-table-cell>
        <md-table-cell md-label="Telefone Contato">{{ item.telefoneContato }}</md-table-cell>
        <md-table-cell md-label="Data Cadastrada">{{ item.dtCadastro }}</md-table-cell>

          <md-table-cell md-label="Ação">
          <md-button class="md-just-icon md-simple md-primary" @click="editar(item.idEmpresa)" >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Editar</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger"  @click="remover(item.idEmpresa)" >
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
  
  name: "company-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  created(){
    this.getEmpresa()
  },
  data() {
    return {
      listaEmpresa: []
    };
  },
  methods: {
       
    getEmpresa(){

      let self = this
      this.$http.get('/empresa/')    
      .then(function(response) {
          console.log( response.data )
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
    incluir(){
          this.$router.push('/empresa') 
    },
    editar(idEmpresa){
          this.$router.push('/empresa/'+idEmpresa) 
    },
    remover(idEmpresa){
      let self = this
      this.$http.delete('/empresa/'+ idEmpresa)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.getEmpresa();
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