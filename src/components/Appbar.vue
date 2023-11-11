<template>
  <v-app-bar class="px-8" :elevation="0">
  <v-icon  @click="$emit('onNormalClick')" class="d-none d-lg-block menu-icn">
    mdi-menu
  </v-icon>
  <!-- <v-text class="d-none d-lg-block  menu-text">Menu</v-text>  -->
  <v-icon @click="$emit('onMobileClick')" class="d-block d-lg-none menu-icn">mdi-menu</v-icon>
  <!-- <v-spacer></v-spacer>  -->
    <!-- SITE ICON -->
      <div class="d-flex align-center">
        <div
        class="rounded-circle d-flex justify-center align-center mr-3 pa-2 grad-bg">
        <v-icon class="" size="x-large" color="company_color">
          mdi-chart-timeline-variant-shimmer
        </v-icon>
      </div>
      <!-- SITE NAME -->
      <h2
        class="text-h4"
        style="font-variant: small-caps; font-size: 1.7rem !important"
      >
      Smart Reports
    </h2>
  </div>
  <v-spacer></v-spacer>
  <notification-bell :accountId="accountId"></notification-bell>
</v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import NotificationBell from "./NotificationBell.vue";
export default defineComponent({
    name: "Appbar",
    data() {
      return{
      }
    },
    props:{
      accountId: {
        type: String as PropType<string>,
        required: true,
      }
    },
    methods: {},
    components: { NotificationBell }
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
