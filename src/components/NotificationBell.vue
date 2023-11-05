<template>
  <v-dialog width="1600" class="d-flex">
    <template v-slot:activator="{ props }">
      <v-icon class="bell-icn" color="primary" v-bind="props">mdi-bell</v-icon>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card color="white">
        <v-card-actions>
          <v-card-title class="text-h5">Notifications</v-card-title>

          <v-spacer></v-spacer>
          <v-btn
          text="Close"
          icon="mdi-close"
          color="red"
          @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
        <v-divider :elevation="3"></v-divider>
          <v-container>
            <v-container>
              <v-card>
                <v-list-item>
                  <notification-kpi-picker @onAdd="onAddItem"></notification-kpi-picker>
                </v-list-item>
              </v-card>
            </v-container>
            <v-container>
            <v-card class="savedNotificationClass" color="#FFFFFF" theme="dark">
                <v-card-title class="text-h5">Saved Notifications</v-card-title>
                  <v-container>
                  <notification-kpi-selected v-for="(notification, i) in savedNotifiations" @delete="onDeleteItem(i)" :KPIName="notification.KPI" :KPIMin="notification.min" :KPIMax="notification.max"/>
                </v-container>
              </v-card>
            </v-container>
          </v-container>

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
          {KPI: "California", min:10, max:100},
          {KPI: "Massags=fsdf", min:10, max:100},
        ]
      }
    },
    components: { NotificationKpiPicker, NotificationKpiSelected },
    methods: {
      onAddItem(newitem: any) {
        this.savedNotifiations.push(newitem)
      },
      onDeleteItem(index: number) {
        this.savedNotifiations.splice(index, 1)
      }
    },
});
</script>

<style>
.bell-icn {
  opacity: 40%;
}
.bell-icn:hover {
  opacity: 1.0;
}
.savedNotificationClass::before {
  opacity: 90%;
}
</style>
