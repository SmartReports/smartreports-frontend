<script lang="ts">

import Navbar from "@/components/Navbar.vue";
import ChatBot from "@/components/ChatBotButton.vue";
import LoadingScreen from "@/components/Splash.vue";
import {defineComponent} from "vue";
import { useMainStore } from "@/store/app";
import {mapStores} from "pinia";

export default defineComponent({
  components: {Navbar, ChatBot, LoadingScreen},
  data() {
    return {
      user_type: "",
    };
  },
  methods: {
    onEmit(value: string) {
      this.user_type = value;
    },
  },
  computed: {
    ...mapStores(useMainStore),
    isLoading() {
      return this.mainStore.activeRequests>0;
    }
  },
});
</script>

<template>
  <LoadingScreen/>

  <Navbar @user_pass="onEmit"> </Navbar>
  <v-main v-if="!isLoading">
    <v-container
      :class="[
          'rounded-xl py-1 my-8 pb-10 bg-light',
          $vuetify.display.mdAndUp ? 'px-12' : 'px-2',
        ]"
    >
      <router-view :user_type="user_type"></router-view>
    </v-container>
    <ChatBot />
  </v-main>
</template>

<style scoped>

</style>
