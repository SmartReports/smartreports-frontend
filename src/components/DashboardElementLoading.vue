<template>
  <div class="pt-8"></div>
  <div class="d-flex justify-center align-center div_center">
    <v-progress-circular
      :size="100"
      :width="8"
      color="primary"
      indeterminate
    >Loading...</v-progress-circular>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  export default {
  }
</script>

<style scoped>
  .v-progress-circular {
    margin: 1rem;
  }

  .div_center {
    height: 100%;
  }
</style>
