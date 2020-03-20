<template>
  <div class="content">
    <div class="md-layout">
      <!--<div class="md-layout-item md-medium-size-100 md-size-66">-->
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <edit-company-form data-background-color="$cyan"> </edit-company-form>
      </div>
      <!--
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <company-card> </company-card>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { EditCompanyForm , CompanyCard} from "@/pages";

export default {
  components: {
    EditCompanyForm,
    CompanyCard
  },
  created(){  
    this.$sidebar.displaySidebar(false);
  }
};
</script>
