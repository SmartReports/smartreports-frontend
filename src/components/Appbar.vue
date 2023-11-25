<template>
  <v-app-bar class="px-8" :elevation="0">
  <v-icon  @click="$emit('onNormalClick')" class="d-none d-lg-block menu-icn">
    mdi-menu
  </v-icon>
  <v-icon @click="$emit('onMobileClick')" class="d-block d-lg-none menu-icn">mdi-menu</v-icon>
    <!-- SITE ICON -->


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
    emits: ['onAccountChange', 'onMobileClick', 'onNormalClick'],
    name: "Appbar",
    data() {
      return{
        isMobile: false,
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

    },
    methods: {
      onResize() {
      this.isMobile = window.innerWidth < 600;
    },
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
.menu-icn {
  position: relative;
  margin-left: -15px;
  margin-right: 25px;
  z-index: 1; /* Ensure the button is displayed on top of the plot */
}
</style>
