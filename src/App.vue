<template>
  <v-app>
    <v-card>
      <v-layout>
        <v-navigation-drawer expand-on-hover rail>
          <v-list>
            <v-list-item prepend-icon="mdi-menu"></v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-archive" title="Archive" value="archive"></v-list-item>
            <v-list-item prepend-icon="mdi-format-float-left" title="Template editor" value="template_editor"></v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-main class="bg-grey-lighten-5">
          <v-app-bar class="px-8">
            <v-spacer></v-spacer>
          <div class="d-flex align-center">
            <div
                class="rounded-circle d-flex justify-center align-center mr-3 pa-2 grad-bg">
                <v-icon class="" size="x-large" color="primary">
                  mdi-chart-timeline-variant-shimmer
                  mdi-spin
                </v-icon>
            </div>
              <h2
                class="text-h4"
                style="font-variant: small-caps; font-size: 1.7rem !important"
              >
                Smart Reports
              </h2>
          </div>
          </v-app-bar>
          <TemplateEdit class="" />
        </v-main>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script setup lang="ts">
import TemplateEdit from "./components/TemplateEditor.vue";
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
