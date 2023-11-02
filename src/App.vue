<template>
  <v-app>
      <Navbar>
      </Navbar>
      <v-main class="bg-grey-lighten-5">
            <router-view></router-view>
      </v-main>
  </v-app>
</template>

<script setup lang="ts">
import TemplateEdit from "./components/TemplateEditor.vue";
import Navbar from "./components/Navbar.vue";
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
