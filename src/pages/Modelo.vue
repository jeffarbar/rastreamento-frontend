<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="$cyan">
            <h4 class="title">Modelo</h4>
            <p class="category">Lista de modelo cadastrados</p>
          </md-card-header>
          <md-card-content>
            <modelo-table table-header-color="$cyan"></modelo-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>



import { ModeloTable } from "@/components";

export default {
  components: {
    ModeloTable 
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
