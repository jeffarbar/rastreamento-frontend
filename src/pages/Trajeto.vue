<template>
   <div class="content">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card class="md-card-plain">
                <md-card-header data-background-color="$cyan">
                    <h4 class="title">Trajeto</h4>
                    <p class="category">Trajeto percorrido</p>
                </md-card-header>
                <div class="md-layout-item md-size-50" id="pesquisa">
                    <md-field>       
                        <VueCtkDateTimePicker v-model="dtInicial" formatted='DD/MM/YY HH:mm' format='YYYY-MM-DD HH:mm'/> 
                        &ensp;&ensp;
                        <VueCtkDateTimePicker v-model="dtFinal" formatted='DD/MM/YY HH:mm' format='YYYY-MM-DD HH:mm' />  
                    </md-field>
                    <md-field>
                        <label>Ponto Monitorado</label>
                        <md-select v-model="identificadorPontoMonitorado" >
                            <md-option v-for="item in listaPontoMonitorado" :value="item.identificador">
                                {{item.nome}} - {{item.identificador}}
                            </md-option>
                        </md-select>
                        <md-button class="md-round md-info" @click="montaTrajetoria()">
                            <md-icon>search</md-icon>
                            Trajeto
                        </md-button>
                    </md-field>
                </div>  
        
                <div v-if="identificadorPontoMonitorado && dtInicial && dtFinal">
                    <a href="#map"><md-icon>expand_less</md-icon></a>
                    <a href="#titulo"><md-icon>expand_more</md-icon></a>
                </div>
                <div v-if="identificadorPontoMonitorado" id="map"></div>
                <div v-else >
                    <p class="center">Por favor selecione um Ponto Monitorado</p>
                </div>
            </md-card>
        </div>
    </div>
 <!-- 
  <md-card class="md-card-plain">
      <div class="md-layout-item md-size-50" id="pesquisa">
        <md-field>
          <label>Ponto Monitorado</label>
          <md-select v-model="identificadorPontoMonitorado" >
            <md-option 
              v-for="item in listaPontoMonitorado" :value="item.identificador">
                {{item.nome}} - {{item.identificador}}
            </md-option>
          </md-select>
        </md-field>
        <md-field>       
          <VueCtkDateTimePicker v-model="dtInicial" formatted='DD/MM/YY HH:mm' format='YYYY-MM-DD HH:mm'/> 
           &ensp;&ensp;  
          <VueCtkDateTimePicker v-model="dtFinal" formatted='DD/MM/YY HH:mm' format='YYYY-MM-DD HH:mm' />  
            &ensp;&ensp;      
          <md-button class="md-round md-info" @click="montaTrajetoria()">
            <md-icon>search</md-icon>
              Trajeto
          </md-button>
        </md-field>
      </div>  
   
    <div v-if="identificadorPontoMonitorado && dtInicial && dtFinal">
        <a href="#map"><md-icon>expand_less</md-icon></a>
        <a href="#titulo"><md-icon>expand_more</md-icon></a>
    </div>
    <div v-if="identificadorPontoMonitorado" id="map"></div>
    <div v-else >
        <p class="center">Por favor selecione um Ponto Monitorado</p>
    </div>
  </md-card>
 -->
</template>
<script>
    import GoogleMapsLoader from "google-maps";
    export default {

        data() {
            return {

                dtInicial: null,
                dtFinal: null,
                identificadorPontoMonitorado: null,
                usuario: null,
                listaPontoMonitorado:[],
                idPontoMonitorado: null,
                keyGoogle: "AIzaSyC3G24J7Pvk_zXdrNNTCrt7pmCRvHKYpNc",
                zoom: 15,
                scrollwheel: true,
                coordinates : [],
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
            this.usuario = this.$localStorage.get('usuario')
            this.getPontoMonitorado()
        },
        
        methods: {

            montaTrajetoria(){

                if(this.identificadorPontoMonitorado == null || this.identificadorPontoMonitorado == '' ||
                this.dtInicial == null  || this.dtInicial ==  '' || this.dtFinal == null || this.dtFinal == ''){
                   this.$notify({
                        message:
                            "Por favor selecione o identificador do Ponto Monitorado",
                            icon: "add_alert",
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        });
                }else{    

                    let dtIni = this.dtInicial.replace(/[ ]+/g,'') + ':00';
                    let dtFin = this.dtFinal.replace(/[ ]+/g,'') + ':00';

                    console.log(this.identificadorPontoMonitorado+'/'+dtIni+'/'+dtFin)

                    let self = this
                    this.$httpTrajeto.get('/trajeto/'+this.identificadorPontoMonitorado+'/'+dtIni+'/'+dtFin)    
                    .then(function(response) {
                        let lista = response.data;
                        lista.forEach(item => {
                            self.coordinates.push( { lat: item.latitude, lng: item.longitude } );
                        });
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
            initMap (google) {

                var flightPath = new google.maps.Polyline({
                    path: this.coordinates,
                    geodesic: true,
                    strokeColor: '#2d4f9f',
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });

                if(this.coordinates.length == 0){
                     var mapOptions = {
                        scrollwheel: this.scrollwheel, 
                        styles: this.styles,
                        zoom: this.zoom,
                        center: { lat: this.usuario.latitude, lng: this.usuario.longitude },
                    }
                }else{
                    var mapOptions = {
                        scrollwheel: this.scrollwheel, 
                        styles: this.styles,
                        zoom: this.zoom,
                        center: this.coordinates[ parseInt(this.coordinates.length / 2) ]
                    }
                }
               
                var map = new google.maps.Map(document.getElementById('map'), mapOptions)
                flightPath.setMap(map);

                 if(this.coordinates.length == 0){

                    this.$notify({
                        message:
                            "Não há dados com esta pesquisa",
                            icon: "add_alert",
                            horizontalAlign: 'center',
                            verticalAlign: 'top',
                            type: 'warning'
                        });

                }else{
                    let localizacaoInicio = this.coordinates[0]
                    this.addMarker(map, localizacaoInicio, 'Inicio','largada.png')

                    let localizacaoFinal = this.coordinates[ this.coordinates.length - 1 ]
                    this.addMarker(map, localizacaoFinal,'Final','chegada.png')
                }
                
            },
            addMarker(map,latLng, title, icone) {

                let marker = new google.maps.Marker({
                    position: latLng,
                    title: title,
                    icon: {
                        url:require('../assets/img/'+icone)
                    }
                });
                marker.setMap(map);
            },
            getPontoMonitorado(){

                //this.listaPontoMonitorado = [ {identificador:'sdfsd6767fd', nome: 'teste'}, {identificador:'tsdasdas', nome: 'ola'} ]
                if(this.usuario != null && this.usuario.idEmpresa != null){ 
                    let self = this
                    this.$http.get('/pontoMonitorado/empresa/'+ this.usuario.idEmpresa)   
                    .then(function(response) {
                        
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
            }
        }
        
    };
</script>
<style>
    .center {
        line-height: 300px;
        height: 300px;    
        text-align: center;
        /*font-weight: bold; */
        font-size: 25px;
    }

    .center p {
        line-height: 1.5;
        display: inline-block;
        vertical-align: middle;
    }
</style>