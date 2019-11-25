<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">Ponto Monitorado</h4>
            <p class="category">Lista de ponto monitorado cadastrados</p>
          </md-card-header>
          <md-card-content>
            <ponto-monitorado-table table-header-color="blue"></ponto-monitorado-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>



import { PontoMonitoradoTable } from "@/components";

export default {
  components: {
    PontoMonitoradoTable 
  },
  data () {
      return {
      }
  },
  created(){  
    this.$sidebar.displaySidebar(false);
  }
};
</script>
