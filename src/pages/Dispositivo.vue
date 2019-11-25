<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="blue">
            <h4 class="title">Dispositivo</h4>
            <p class="category">Lista de dispositivo cadastrados</p>
          </md-card-header>
          <md-card-content>
            <dispositivo-table table-header-color="blue"></dispositivo-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import { DispositivoTable } from "@/components";

export default {
  components: {
    DispositivoTable 
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
