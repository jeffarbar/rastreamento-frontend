<template>
  <form>
    <md-card>
      <md-card-header>
        <h4 class="title">Empresa</h4>
        <p class="category">Dados da empresa</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
        
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Razão Social</label>
              <md-input v-model="empresa.razaoSocial" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Cnpj</label>
              <md-input v-model="empresa.cnpj" type="text"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email Contato</label>
              <md-input v-model="empresa.emailContato" type="email" ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Telefone Contato</label>
              <md-input v-model="empresa.telefoneContato" type="text" ></md-input>
            </md-field>
          </div>
         
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-round md-info" @click="voltar()" >
              <md-icon>home</md-icon>
               Voltar 
            </md-button>
            &nbsp;&nbsp;
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
  name: "edit-company-form",
    
  data() {
    return {
      empresa: {
          idEmpresa: null,
          razaoSocial: null,
          cnpj: null,
          emailContato: null,
          telefoneContato: null
      }
    };
  },
  created(){
  
    let idEmpresa = this.$route.params.idEmpresa;

    this.getEmpresa(idEmpresa);
  },
  methods: {
    voltar(){
      this.$router.push('/listaempresa') 
    },
    getEmpresa( idEmpresa ){

      if( idEmpresa != null ){

         let self = this
         this.$http.get('/empresa/'+idEmpresa)    
          .then(function(response) {
            self.empresa = response.data;
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

    salva() {
      let self = this
      if( this.empresa == null || this.empresa.razaoSocial == null || this.empresa.cnpj == null 
        || this.empresa.emailContato == null || this.empresa.telefoneContato == "" ){

          self.$notify({
          message:
              "Campos obrigatórios",
              icon: "add_alert",
              horizontalAlign: 'center',
              verticalAlign: 'top',
              type: 'warning'
          }); 

      }else{
      
        this.$http.post('/empresa/',
          this.empresa
        )    
        .then(function(response) {
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
