<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="$cyan">
            <h4 class="title">Tipo Ponto Monitorado</h4>
            <p class="category">Lista de tipo ponto monitorado cadastrados</p>
          </md-card-header>
          <md-card-content>
            <tipo-ponto-monitorado-table table-header-color="$cyan"></tipo-ponto-monitorado-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>



import { TipoPontoMonitoradoTable } from "@/components";

export default {
  components: {
    TipoPontoMonitoradoTable 
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
