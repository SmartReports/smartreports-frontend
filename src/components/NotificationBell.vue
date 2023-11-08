<template>
  <v-dialog width="1600" class="d-flex">
    <template v-slot:activator="{ props }">
      <v-icon class="bell-icn" color="primary" v-bind="props">mdi-bell</v-icon>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-actions>
          <v-card-title class="text-h5">Notifications</v-card-title>

          <v-spacer></v-spacer>
          <v-btn
          text="Close"
          icon="mdi-close"
          color="error"
          @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
        <v-divider :elevation="3"></v-divider>
          <v-container>
            <v-container>
              <v-card>
                <v-list-item>
                  <notification-kpi-picker @insert="onAddItem"></notification-kpi-picker>
                </v-list-item>
              </v-card>
            </v-container>
            <v-container>
            <v-card class="savedNotificationClass">
                <v-card-title class="text-h5">Saved Notifications</v-card-title>
                  <v-container>
                  <notification-kpi-selected v-for="alarm in alarms" @delete="onDeleteAlarm(alarm.id)" :KPIId="alarm.kpi" :KPIMin="alarm.min_value" :KPIMax="alarm.max_value"/>
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
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import NotificationKpiPicker from "./NotificationKpiPicker.vue";
import NotificationKpiSelected from "./NotificationKpiSelected.vue";
import { Alarms } from "@/models";
export default defineComponent({
    name: "NotificationBell",
    async created() {
      this.alarms = (await this.axios.get("/alarms-list/")).data
    },
    data() {
      return {
        alarms: [
        ] as Alarms[],
      }
    },
    components: { NotificationKpiPicker, NotificationKpiSelected },
    methods: {
      async onAddItem(kpiId: any, min:number, max:number) {
        console.log(kpiId, min, max)
        await this.axios.post(`/alarms-list/`, {user_type: "parent", min_value: min, max_value: max, kpi: kpiId})
      },
      async onDeleteAlarm(index: string) {
        if (!confirm("Are you sure you want to delete this alarm?")) {
        return;
        }
        await this.axios.delete(`/alarms-list/${index}/`);
        this.alarms = this.alarms.filter((alarm) => alarm.id != index);
      }
    },
    computed: {
    ...mapStores(useMainStore),
    getAlarms() {
      return this.alarms.map((alarms) => ({
        name: alarms.kpi,
        max_value: alarms.max_value,
        min_value: alarms.min_value,
      }));
    },
  }
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
