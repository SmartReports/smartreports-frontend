<template>
  <v-app>
      <Navbar>
      </Navbar>
      <v-main class="bg-grey-lighten-5">
            <v-container class="rounded-xl px-16 my-8 pb-10 bg-white">
              <router-view></router-view>
            </v-container>
            <ChatBot/>
            <!-- <v-btn class="chat-btn" icon="mdi-robot" size="x-large" @click=new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")></v-btn> -->
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
