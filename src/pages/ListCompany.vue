<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="$cyan">
            <h4 class="title">Empresa</h4>
            <p class="category">Lista de empresas</p>
          </md-card-header>
          <md-card-content>
            <company-table table-header-color="$cyan"></company-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>



import { CompanyTable } from "@/components";

export default {
  components: {
    CompanyTable 
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
