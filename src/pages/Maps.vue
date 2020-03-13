<template>
  <div class="content">
    <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="$cyan">
            <h4 class="title">Mapa</h4>
            <p class="category">Mapa do ponto</p>
          </md-card-header>
           <div class="md-layout-item md-size-50">
            <md-field>
              <label>Seleciona o Ponto Monitorado</label>
              <md-select v-model="idPontoMonitorado" >
                <md-option 
                  v-for="item in listaPontoMonitorado" :value="item.idPontoMonitorado">
                    {{item.nome}} - {{item.identificador}}
                </md-option>
              </md-select>
            
              <md-button class="md-round md-info" @click="getLocalizacao()">
                <md-icon>search</md-icon>
                  localizar
              </md-button>
            </md-field>
          </div>  
          <div v-if="idPontoMonitorado" >
            <a href="#map"><md-icon>expand_less</md-icon></a>
            <a href="#titulo"><md-icon>expand_more</md-icon></a>
          </div>
        <div id="map"></div>
        </md-card>
      </div>
   
  </div>
  <!--
  <md-card class="md-card-plain">
      <div class="md-layout-item md-size-50">
        <md-field>
          <label>Seleciona o Ponto Monitorado</label>
          <md-select v-model="idPontoMonitorado" >
            <md-option 
              v-for="item in listaPontoMonitorado" :value="item.idPontoMonitorado">
                {{item.nome}} - {{item.identificador}}
            </md-option>
          </md-select>
        
          <md-button class="md-round md-info" @click="getLocalizacao()">
            <md-icon>search</md-icon>
              localizar
          </md-button>
        </md-field>
      </div>  
      <div v-if="idPontoMonitorado" >
        <a href="#map"><md-icon>expand_less</md-icon></a>
        <a href="#titulo"><md-icon>expand_more</md-icon></a>
      </div>
    <div id="map"></div>
  </md-card>
 -->
</template>

<script>
import GoogleMapsLoader from "google-maps";
export default {
   data() {
    return {
      idPontoMonitorado: null,
      usuario: null,
      listaPontoMonitorado:[],
      localizacaoCentral: {},
      listaLocalizacao: [],
      keyGoogle: "AIzaSyC3G24J7Pvk_zXdrNNTCrt7pmCRvHKYpNc",
      styles: [
          {
            featureType: "water",
            stylers: [
              { saturation: 43 },
              { lightness: -11 },
              { hue: "#0088ff" }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              { hue: "#ff0000" },
              { saturation: -100 },
              { lightness: 99 }
            ]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "on" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
    };
  },
  created(){
    
    this.$sidebar.displaySidebar(false);

    this.idPontoMonitorado = this.$route.params.idPontoMonitorado;
    this.usuario = this.$localStorage.get('usuario')

    this.getLocalizacaoCentral(this.usuario.latitude, this.usuario.longitude)
    this.getPontoMonitorado()

    if(this.idPontoMonitorado != null){
      this.getLocalizacao()
    }else{
      this.getLocalizacaoAll()
    }
    
  },
  methods: {
    initMap(google) {

      let latLngCentral = {lat: this.localizacaoCentral.latitude , lng: this.localizacaoCentral.longitude}      

      var map = new google.maps.Map(document.getElementById('map'), {
        center: latLngCentral,
        zoom: this.localizacaoCentral.zoom,
        styles: this.styles,
        scrollwheel: true
      });
    
      this.listaLocalizacao.forEach((valor, index) => {
        console.log( 'valor ' + valor )
         if(  valor.latitude != null && valor.longitude != null ){
            this.addMarker( valor , map);
         }
      });
    },
    addMarker(localizacao, map) {

      let title = '';
      if(localizacao.data != null && localizacao.data != undefined){
        title = 'Data ' + localizacao.data
      }
      if(localizacao.descricao != null && localizacao.descricao != undefined){
        title = localizacao.descricao
      }


      let latLng = {lat: localizacao.latitude , lng: localizacao.longitude}
      let marker = new google.maps.Marker({
        position: latLng,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: {
          url:require('../assets/img/car.png')
        }
      });
      marker.setMap(map);
    },
    
    getLocalizacaoAll(){
    
      if( this.usuario != null && this.usuario.idEmpresa != null ){ 
        let self = this
        this.$http.get('/posicaoAtualPontoMonitorado/all/' + this.usuario.idEmpresa)    
        .then(function(response) {
          self.listaLocalizacao = response.data;
          GoogleMapsLoader.KEY = self.keyGoogle;
          GoogleMapsLoader.load(google => {
            self.initMap(google);
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
    },
    getLocalizacao(){
      console.log('this.idPontoMonitorado ' + this.idPontoMonitorado)
      let self = this
      this.listaLocalizacao = []
      this.$http.get('/posicaoAtualPontoMonitorado/' + this.idPontoMonitorado)    
      .then(function(response) {
        console.log(response.data)
        self.getLocalizacaoCentral(response.data.latitude , response.data.longitude )
        self.listaLocalizacao[0] = response.data;
        GoogleMapsLoader.KEY = self.keyGoogle;
        GoogleMapsLoader.load(google => {
          self.initMap(google);
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
    getLocalizacaoCentral(latitude,longitude){
      console.log('OOOO ' + latitude + ' III ' + longitude)
      if(latitude != null && longitude != null ){
        let localizacaoCentral = { 
            latitude: latitude,
            longitude: longitude,
            zoom: this.usuario.zoom 
          }

        this.localizacaoCentral = localizacaoCentral;  
      }
    },
    getPontoMonitorado(){

      if( this.usuario != null && this.usuario.idEmpresa != null){ 
        let self = this
        this.$http.get('/pontoMonitorado/empresa/'+ this.usuario.idEmpresa)    
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
      }
    },
  }

};
</script>
