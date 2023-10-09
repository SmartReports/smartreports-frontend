<template>
  <v-app>
    <v-app-bar class="px-8">
      <div class="d-flex align-center">
        <div
          class="rounded-circle d-flex justify-center align-center mr-3 pa-2 grad-bg"
        >
          <v-icon class="" size="x-large" color="primary">
            mdi-chart-timeline-variant-shimmer
          </v-icon>
        </div>

        <h2
          class="text-h4"
          style="font-variant: small-caps; font-size: 1.8rem !important"
        >
          Smart Reports
        </h2>
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

<style>
.grad-bg {
  background-image: linear-gradient(
    230deg,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(0, 0, 0, 0) 50%
  );
  background-color: #35aaff47 !important;
}
</style>
