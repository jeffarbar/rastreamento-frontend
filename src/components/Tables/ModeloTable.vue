<template>

  <div>
    <div class="md-layout-ite md-size-100 text-right">
      <md-button class="md-round md-info" @click="mostrarModal">
        <md-icon>add</md-icon>
          Incluir 
      </md-button>
    </div>

   <transition name="modal" v-if="showModal"> 
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <md-card class="md-card-plain">
    
              <md-card-header data-background-color="blue">
                <h4 class="title">Cadastrar Modelo</h4>
              </md-card-header>
                <md-card-content>

                  <div class="md-layout-item md-size-100">
                    <md-field>
                        <label>Nome</label>
                        <md-input v-model="modelo.descricao"  type="text" ></md-input>
                    </md-field>

                  </div> 
                </md-card-content>    
                <footer class="footer">  
                  <div class="md-layout-item md-size-100 text-right">
                    <md-button class="md-round md-info" @click="showModal=false">
                      <md-icon>add</md-icon>
                        Cancelar 
                    </md-button>
                    &nbsp;
                    <md-button class="md-round md-info" @click="salvaModelo">
                      <md-icon>thumb_up</md-icon>
                        Salvar 
                    </md-button>
                  </div>
                </footer>
              </md-card>
            </div>
          </div>
      </div>
    </transition>  

    <mdb-modal v-if="showModal" @close="showModal=false">  </mdb-modal>
    <md-table v-model="listaModelo" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Descrição">{{ item.descricao }}</md-table-cell>
        <md-table-cell md-label="Data Cadastrada">{{ item.dtCadastro }}</md-table-cell>

          <md-table-cell md-label="Ação">
          <md-button class="md-just-icon md-simple md-primary" @click="editar(item.idModelo)" >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Editar</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger"  @click="remover(item.idModelo)" >
            <md-icon>delete</md-icon>
            <md-tooltip md-direction="top">Remover</md-tooltip>
          </md-button>
        </md-table-cell>

      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import {
  NavTabsTable , NavTabsCard
} from "@/components";
import { mdbModal } from 'mdbvue';

export default {
  name: "modelo-table",
  components: { NavTabsTable , NavTabsCard , mdbModal},
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  created(){
    this.getModelo()
  },
  data() {
    return {
      showModal: false,
      modelo: {
        descricao: null,
        idModelo: null
      },
      listaModelo: []
    };
  },
  methods: {

    remover(idModelo){
      let self = this
      this.$http.delete('/modelo/'+ idModelo)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.getModelo();
        self.$notify({
            message:
              "Modelo deletado com sucesso",
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
    },
    editar(idModelo){

      this.mostrarModal();
      let self = this
      this.$http.get('/modelo/'+ idModelo)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.modelo = response.data;
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

    mostrarModal(){
      this.showModal=true;
      this.getModelo();
    },
    esconderModal(){
      this.showModal=false;
    },

    getModelo(){

      let self = this
      this.$http.get('/modelo/')    
      .then(function(response) {
        self.listaModelo = response.data;
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
 
    salvaModelo(){

      let self = this
      if( this.modelo == null || this.modelo.descricao == null ){
          
          self.$notify({
            message:
              "Campos obrigatórios",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
          }); 
      }else{
      
        this.$http.post('/modelo/', 
          this.modelo
        ).then(function(response) { 
            self.getModelo();
            self.esconderModal();
            self.$notify({
              message:
                "Modelo salvo com sucesso",
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

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
   width: 385px;
   margin: 0 auto;
   padding: 10px 20px;
   background-color: #fff;
   border-radius: 2px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
   transition: all .3s ease;
   font-family: Helvetica, Arial, sans-serif;
}


.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */


.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
