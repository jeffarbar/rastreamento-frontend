<template>

  <div>
    <div class="md-layout-item md-size-100 text-right">
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
                <h4 class="title">Cadastrar Dispositivo</h4>
             </md-card-header>
             <md-card-content>

               <div class="md-layout-item md-size-100">
                  <md-field>
                      <label>Nome</label>
                      <md-input v-model="dispositivo.nome" type="text" ></md-input>
                  </md-field>

                  <md-field>
                      <label>Identificador</label>
                      <md-input v-model="dispositivo.identificador" type="text"></md-input>
                  </md-field>
                  <md-field>
                      <label>Tipo Modelo</label>
                      <md-select
                          v-model="dispositivo.idModelo" >
                          <md-option v-for="item in listaModelo" :value="item.idModelo">{{item.descricao}}</md-option>
                      </md-select>
                  </md-field>
                  <md-field>
                      <label>Ponto Monitorado</label>
                      <md-select
                          v-model="dispositivo.idPontoMonitorado" >
                          <md-option v-for="item in listaPontoMonitorado" :value="item.idPontoMonitorado">{{item.nome}} - {{item.identificador}}</md-option>
                      </md-select>
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
                  <md-button class="md-round md-info" @click="salvaDispositivo">
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

    <md-table v-model="listaDispositivo" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Nome">{{ item.nome }}</md-table-cell>
        <md-table-cell md-label="Identificador">{{ item.identificador }}</md-table-cell>
        <md-table-cell md-label="Modelo">{{ item.modelo }}</md-table-cell>
        <md-table-cell md-label="Data Cadastrada">{{ item.dtCadastroDispositivo }}</md-table-cell>

          <md-table-cell md-label="Ação" >
          <md-button class="md-just-icon md-simple md-primary" @click="editar(item.idDispositivo , item.idPontoMonitorado)" >
            <md-icon>edit</md-icon>
            <md-tooltip md-direction="top">Editar</md-tooltip>
          </md-button>
          <md-button class="md-just-icon md-simple md-danger"  @click="remover(item.idDispositivo , item.idPontoMonitorado)" >
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
  
  name: "dispositivo-table",
  components: { mdbModal},
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  created(){
    this.getDispositivo()
  },
  data() {
    return {
      showModal: false,
      dispositivo: {
          nome: null,
          identificador: null,
          idModelo: null,
          idPontoMonitorado: null
      },
      listaPontoMonitorado: [],
      listaModelo: [],
      listaDispositivo: []
    };
  },
  methods: {

    remover(idDispositivo, idPontoMonitorado){
      let self = this
      this.$http.delete('/dispositivo/'+ idDispositivo +"/"+idPontoMonitorado)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.getDispositivo();
        self.limparUsuario();
        self.$notify({
            message:
              "Dispositivo deletado com sucesso",
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
    editar(idDispositivo,idPontoMonitorado){

      this.mostrarModal();
      let self = this
      this.$http.get('/dispositivo/'+ idDispositivo +"/"+idPontoMonitorado)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.dispositivo = response.data;
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
      this.limparUsuario();
      this.showModal=true;
      this.getPontoMonitorado();
      this.getModelo();
    },
    esconderModal(){
      this.limparUsuario();
      this.showModal=false;
    },
    limparUsuario(){
      this.dispositivo.nome = null;
      this.dispositivo.identificador = null;
      this.dispositivo.idModelo = null;
      this.dispositivo.idPontoMonitorado = null;
    },
    getDispositivo(){

      let usuario = this.$localStorage.get('usuario')
 
      let self = this
      this.$http.get('/dispositivo/usuario/'+ usuario.idUsuario)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.listaDispositivo = response.data;
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

    getPontoMonitorado(){

      let usuario = this.$localStorage.get('usuario')

      let self = this
      this.$http.get('/pontoMonitorado/usuario/'+ usuario.idUsuario)    
      .then(function(response) {
        console.log("tttt" + response.data)
        self.listaPontoMonitorado = response.data;
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

    salvaDispositivo(){
      
      let self = this
       if( this.dispositivo == null || this.dispositivo.nome == null || this.dispositivo.identificador == null 
        || this.dispositivo.idModelo == null || this.dispositivo.idPontoMonitorado == null ){
          
          self.$notify({
            message:
              "Campos obrigatórios",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
          }); 
      }else{

        this.$http.post('/dispositivo/', 
          this.dispositivo
        ).then(function(response) { 
            self.esconderModal();
            self.getDispositivo();
            console.log("FOI " + response.data)
            self.$notify({
              message:
                "Ponto Monitorado salvo com sucesso",
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
