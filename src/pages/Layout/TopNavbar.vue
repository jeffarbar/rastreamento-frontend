<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row" id="titulo">
      <!--  <h4 class="md-title"><strong>{{ $route.name }}</strong></h4> -->
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
         <md-icon>menu</md-icon> 
        </md-button>

        <div class="md-collapse">
      
          <md-list>

            <li class="md-list-item">
              <a
                href="#"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification"> {{qdtNotificao}} </span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">

                      <li v-for="notificacao in notificacoes"> 
                        <a href="#"> {{ notificacao.descricao }} </a> 
                      </li>
                      <li v-if="qdtNotificao == 0"> 
                         <a href="#"> Não há notificação </a> 
                      </li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>

            <li class="md-list-item">
              <a
                href="#"
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>person</md-icon>
                      <p class="hidden-lg hidden-md">{{nomeUsuario}}</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li><a href="#/user">Perfil</a></li>
                      <li><a href="#/login">Sair</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data() {
    return {
      selectedEmployee: null,
      notificacoes: [] ,
      qdtNotificao: 0,
      nomeUsuario: ''
    };
  },
  created(){
    let usuario = this.$localStorage.get('usuario')
    this.nomeUsuario = usuario.nome;
    this.getNotificacao( usuario.idUsuario)
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    getNotificacao(idUsuario){

      let self = this
      this.$http.get('/notificacao/'+ idUsuario)
        .then(function(response) {
          self.notificacoes = response.data
          self.qdtNotificao = response.data.length
        }).catch(e => {
        console.log( e )
      })
    }
  }
};
</script>

<style lang="css"></style>
