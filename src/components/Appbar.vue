<template>
  <v-app-bar class="px-8" :elevation="0">
  <v-icon  @click="$emit('onNormalClick')" class="d-none d-md-none d-lg-block menu-icn">
    mdi-menu
  </v-icon>
  <v-icon @click="$emit('onMediumClick')" class="d-none d-sm-block d-md-block d-lg-none menu-icn">mdi-menu</v-icon>
    <!-- SITE ICON -->
    <img :class="{ 'invert-color': invert }"  v-if="isMobile || small_screen" src="../assets/logo.svg" alt="logo" height="40px" />
  <v-spacer></v-spacer>
  <DarkMode></DarkMode>
  <div class="px-4"></div>
  <!-- ACCOUNT ICON AND DROPDOWN SELECTOR -->
  <template v-slot:append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-avatar >
            <v-img
              v-bind="props"
              :src="mainStore.currentAccount.image"
              :alt="mainStore.currentAccount.name"
            ></v-img>
            </v-avatar>
          </template>
          <v-list>
            <v-list-item
              v-for="(account, index) in mainStore.accounts"
              :key="index"
              :value="index"
              :prepend-avatar="account.image"
              @click="$emit('onAccountChange', index, mainStore.currentAccount)"
              :title="account.name"
              :subtitle="account.employment"
            >
            </v-list-item>
          </v-list>
        </v-menu>
    </template>
</v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import DarkMode from "./DarkMode.vue"
export default defineComponent({
    emits: ['onAccountChange', 'onMediumClick', 'onNormalClick'],
    name: "Appbar",
    data() {
      return{
        isMobile: false,
        small_screen : window.innerWidth < 1300,
      }
    },
    props:{
      accountId: {
        type: String as PropType<string>,
        required: true,
      }
    },
    computed:{
    ...mapStores(useMainStore),
    invert() { return (this.$vuetify.theme as any).global.name == 'dark'; },
    isMobile() { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
    },
    methods: {
      onResize() {
        this.small_screen = window.innerWidth < 1300;
      }
    },
    components: { DarkMode },
    beforeDestroy() {
      if (typeof window === "undefined") return;
      window.removeEventListener("resize", this.onResize);
    },
    mounted() {
      this.onResize();
      window.addEventListener("resize", this.onResize);
    },
})
</script>

<style>
.invert-color {
  filter: invert(1); /* Invert the color */
}
.menu-icn {
  position: relative;
  margin-left: -15px;
  margin-right: 25px;
  z-index: 1; /* Ensure the button is displayed on top of the plot */
}
</style>
