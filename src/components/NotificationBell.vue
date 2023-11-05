<template>
  <v-dialog width="500">
    <template v-slot:activator="{ props }">
      <v-icon color="primary" v-bind="props">mdi-bell</v-icon>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
          text="Close Dialog"
          @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "NotificationBell",
  data() {
  },
});
</script>
