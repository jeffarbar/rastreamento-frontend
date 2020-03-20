// =========================================================
// * Vue Material Dashboard - v1.2.1
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-dashboard
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-dashboard/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import "./assets/css/normalize.min.css";
import "./assets/css/im.css";

// router setup
import routes from "./routes/routes";

import './filters';

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";
import axios from 'axios';
import Storage from 'vue-web-storage';  
import EmojiPicker from '@zaichaopan/emoji-picker';

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import store from './store';

import Chartist from "chartist";

import Modal from '@/components'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;

const base = axios.create({
  baseURL: 'http://sendsolutions.me:8082/rastreamento'
   //baseURL: 'http://40.71.38.222:8082/rastreamento'
})

const baseTrajeto = axios.create({
  baseURL: 'http://13.90.255.204:8092/trajeto'
  //baseURL: 'http://40.71.38.222:8092/trajeto'
})

const baseMensagem = axios.create({
  baseURL: 'http://sendsolutions.me:8072/send'
  //baseURL: 'http://13.90.255.204:8072/send'
})


Vue.prototype.$http = base
Vue.prototype.$httpTrajeto = baseTrajeto
Vue.prototype.$httpMensagem = baseMensagem

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Storage); 
Vue.use(EmojiPicker);

Vue.component(Modal);
Vue.component('modal', {
  template: '#modal-template'
})
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  store,
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist,
    http: base,
    httpTrajeto: baseTrajeto,
    httpMensagem: baseMensagem
  },
  created() {
    if (this.$route.query.peer) {
        this.$store.commit('setCurrentPeer', this.$route.query.peer);
    }
  },
  watch: {
    '$route' (to, from) {

        if (to.query.peer) {
            this.$store.commit('setCurrentPeer', to.query.peer);
        }
    }
 } 
});
