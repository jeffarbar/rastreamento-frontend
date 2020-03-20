<template>

  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card class="md-card-plain">
          <md-card-header data-background-color="$cyan">
            <h4 class="title">Usuário</h4>
            <p class="category">Lista de usuários</p>
          </md-card-header>
          <md-card-content>
            <user-table table-header-color="$cyan"></user-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>



import { UserTable } from "@/components";

export default {
  components: {
    UserTable 
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
