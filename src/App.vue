<template>
  <v-app>
    <v-app-bar class="px-8">
      <div class="d-flex align-center">
        <v-icon class="mr-3" size="x-large" color="primary"
          >mdi-chart-timeline-variant-shimmer</v-icon
        >
        <h2 class="text-h5 text-uppercase">Smart Reports</h2>
      </div>
    </v-app-bar>
    <v-main class="bg-grey-lighten-5">
      <TemplateEditor class="" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TemplateEditor from "./components/TemplateEditor.vue";
</script>
