<template >
<v-app-bar class="px-8" :elevation="0">
  <v-icon @click="$emit('onMobileClick')" class="d-md-none">mdi-menu</v-icon>
  <v-spacer class="d-md-none"></v-spacer>
    <!-- SITE ICON -->
      <div class="d-flex align-center">
        <div
        class="rounded-circle d-flex justify-center align-center mr-3 pa-2 grad-bg">
        <v-icon class="" size="x-large" color="primary">
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
  <notification-bell></notification-bell>
</v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import NotificationBell from './NotificationBell.vue';
export default defineComponent({
    name: "Appbar",
    data() {
    },
    methods: {},
    components: { NotificationBell }
})
</script>
