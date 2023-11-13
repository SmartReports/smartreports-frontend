<template>
  <div class="loading-wrapper">
    <v-progress-circular
      :size="100"
      :width="8"
      color="purple"
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
  .loading-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
</style>
