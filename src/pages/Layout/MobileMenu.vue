<template>
  <ul class="nav nav-mobile-menu">

    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">notifications</i>
          <span class="notification">{{qdtNotificao}}</span>
          <p>Notifications</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
           <li v-for="notificacao in notificacoes"> 
              <a href="#"> {{ notificacao.descricao }} </a> 
            </li>
            <li v-if="qdtNotificao == 0"> 
                <a href="#"> Não há notificação </a> 
            </li>
        </ul>
      </drop-down>
    </li>
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">person</i>
          <p>{{nomeUsuario}}</p>
        </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li align="center"><a align="right" href="#/user">Perfil</a></li>
            <li align="center"><a align="right" href="#/login">Sair</a></li>
          </ul>
       </drop-down>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      notificacoes: [] ,
      qdtNotificao: 0,
      nomeUsuario: ''
    };
  },
  created(){
    let usuario = this.$localStorage.get('usuario')
    this.nomeUsuario = usuario.nome;
    this.getNotificacao( usuario.idUsuario )
  },
  methods: {
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
