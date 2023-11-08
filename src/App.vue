<template>
  <v-app>
      <Navbar>
      </Navbar>
      <v-main>
            <v-container class="rounded-xl px-12 py-6 my-8 pb-10 bg-surface">
              <router-view></router-view>
            </v-container>
            <ChatBot/>
      </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import ChatBot from "./components/ChatBot.vue"
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
