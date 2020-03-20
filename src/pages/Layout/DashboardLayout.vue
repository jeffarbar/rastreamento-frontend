<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <side-bar>
      <mobile-menu slot="content"></mobile-menu>

      <li v-for="menu in listaMenu">

        <div v-if="menu.blank" >
          <sidebar-link to="#irpara" :onclick="ir(menu.link)"> 
              <md-icon>{{ menu.icone }}</md-icon>
              <p>{{  menu.titulo }}</p>
          </sidebar-link>
        </div>  
        <div v-else >
          <sidebar-link :to="menu.link">
              <md-icon>{{ menu.icone }}</md-icon>
              <p>{{  menu.titulo }}</p>
          </sidebar-link>
        </div>  
        <br>
      </li>

     <!--  
      <sidebar-link to="/trajeto"> 
        <md-icon>navigation</md-icon>
        <p>Trajeto</p>
      </sidebar-link>
       <sidebar-link to="#irpara" :onclick="ir('http://13.90.142.231:8080')"> 
        <md-icon>chat_bubble</md-icon>
        <p>Mensagem</p>
      </sidebar-link>

      <sidebar-link to="/maps">
        <md-icon>location_on</md-icon>
        <p>Mapa</p>
      </sidebar-link>
  
      <sidebar-link to="/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Dashboard</p>
      </sidebar-link>
 
      <sidebar-link to="/pontomonitorado">
        <md-icon>directions_car</md-icon>
        <p>Ponto Monitorado</p>
      </sidebar-link>
      <sidebar-link to="/dispositivo">
        <md-icon>phonelink_ring</md-icon>
        <p>Dispositivo</p>
      </sidebar-link>
       <sidebar-link to="/tipopontomonitorado">
        <md-icon>rss_feed</md-icon>
        <p>Tipo Ponto Monitorado</p>
      </sidebar-link>
       <sidebar-link to="/modelo">
        <md-icon>view_module</md-icon>
        <p>Modelo</p>
      </sidebar-link>
      <sidebar-link to="/user">
        <md-icon>person</md-icon>
        <p>Usuário</p>
      </sidebar-link>
     -->

      <!--
      <sidebar-link to="/typography">
        <md-icon>library_books</md-icon>
        <p>Typography</p>
      </sidebar-link>

      <sidebar-link to="/icons">
        <md-icon>bubble_chart</md-icon>
        <p>Icons</p>
      </sidebar-link>
     
      <sidebar-link to="/notifications">
        <md-icon>notifications</md-icon>
        <p>Notifications</p>
      </sidebar-link>
      -->
    </side-bar>
  
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content> </dashboard-content>

      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  data() {
    return {
      listaMenu: []
    };
  },
  created(){
    this.getMenu()
  },
  methods: {
    getMenu(){
      let usuario = this.$localStorage.get('usuario')
      this.listaMenu = usuario.perfilVo.permissaoMenuVo;
    },
    ir(url){
      if(this.$route.fullPath != undefined && this.$route.fullPath.endsWith('#irpara')){

        let usuario = this.$localStorage.get('usuario')
        window.open(url + '/' + usuario.idUsuario, '_blank');
      }
    }
  }
}

</script>
