<template>
  <v-app>
      <AppWrapper></AppWrapper>
<!--    <Navbar @user_pass="onEmit"> </Navbar>-->
<!--    <v-main>-->
<!--      <v-container-->
<!--        :class="[-->
<!--          'rounded-xl py-1 my-8 pb-10 bg-light',-->
<!--          $vuetify.display.mdAndUp ? 'px-12' : 'px-2',-->
<!--        ]"-->
<!--      >-->
<!--        <router-view :user_type="user_type"></router-view>-->
<!--      </v-container>-->
<!--      <ChatBot />-->
<!--    </v-main>-->
  </v-app>
</template>

<script lang="ts">
</script>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import ChatBot from "./components/ChatBot.vue";
import AppWrapper from "@/components/AppWrapper.vue";
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
