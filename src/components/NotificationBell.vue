<template>
  <v-dialog width="1600" class="d-flex">
    <template v-slot:activator="{ props }">
      <v-icon class="bell-icn" color="primary" v-bind="props">mdi-bell</v-icon>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-divider :elevation="3"></v-divider>
          <v-container>
            <v-card-title>Notifications Add</v-card-title>
            <v-list-item>
              <notification-kpi-picker></notification-kpi-picker>
            </v-list-item>
          </v-container>
          <v-container>
            <v-card-title>Saved Notifications</v-card-title>
            <v-list-item v-for="(notification, i) in savedNotifiations">
              <notification-kpi-selected/>
            </v-list-item>
          </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
          text="Close"
          color="red"
          @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import NotificationKpiPicker from "./NotificationKpiPicker.vue";
import NotificationKpiSelected from "./NotificationKpiSelected.vue";
export default defineComponent({
    name: "NotificationBell",
    data() {
      return {
        savedNotifiations: [
          {KPI: 1, min:10, max:100},
          {KPI: 1, min:10, max:100},
        ]
      }
    },
    components: { NotificationKpiPicker, NotificationKpiSelected }
});
</script>

<style>
.bell-icn {
  opacity: 40%;
}
.bell-icn:hover {
  opacity: 1.0;
}
</style>
