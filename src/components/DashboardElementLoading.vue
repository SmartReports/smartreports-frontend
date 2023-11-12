<template>
  <div class="text-center">
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
</style>
