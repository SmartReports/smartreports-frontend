<template>
  <v-container>
    <v-card-actions>
      <v-card-title class="text-h5">Add Notifications</v-card-title>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-divider :elevation="3"></v-divider>
    <v-container :class="{ 'px-0': $vuetify.display.smAndDown }">
      <v-card>
        <v-list-item>
          <notification-kpi-picker
            :accountId="user_type"
            @insert="onAddItem"
          ></notification-kpi-picker>
        </v-list-item>
      </v-card>
    </v-container>
    <v-container :class="{ 'px-0': $vuetify.display.smAndDown }">
      <v-card class="savedNotificationClass">
        <v-card-title class="text-h5">Saved Notifications</v-card-title>
        <v-container>
          <NotificationKpiElement
            v-for="(alarm, index) in alarmAsItem"
            @update="onUpdateItem"
            @delete="onDeleteAlarm"
            :alarm="alarm"
            :key="index"
          />
        </v-container>
      </v-card>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import NotificationKpiPicker from "./NotificationKpiPicker.vue";
import NotificationKpiElement from "./NotificationKpiElement.vue";
import { Account, Alarms } from "@/models";
import { onUpdated } from "vue";
import { type } from "os";
export default defineComponent({
  name: "NotificationBell",
  emits: [],
  data() {
    return {};
  },
  components: { NotificationKpiPicker, NotificationKpiElement },
  props: {
    user_type: {
      type: String as PropType<string>,
      required: true,
    },
  },
  methods: {
    async onUpdateItem(id: string, kpiId: any, min: number, max: number) {
      await this.axios.put(`/alarms-list/${id}/`, {
        id: id,
        user_type: this.user_type,
        min_value: min,
        max_value: max,
        kpi: kpiId,
      });
      this.mainStore.getAlarms(this.user_type);
    },
    async onAddItem(id: string, kpiId: any, min: number, max: number) {
      await this.axios.post(`/alarms-list/`, {
        id: id,
        user_type: this.user_type,
        min_value: min,
        max_value: max,
        kpi: kpiId.value,
      });
      this.mainStore.getAlarms(this.user_type);
    },
    async onDeleteAlarm(index: string, deleting: any) {
      if (!confirm("Are you sure you want to delete this alarm?")) {
        return;
      }
      await this.axios.delete(`/alarms-list/${index}/`);
      this.mainStore.getAlarms(this.user_type);
    },
  },
  computed: {
    ...mapStores(useMainStore),
    alarms() {
      return this.mainStore.alarms;
    },
    alarmAsItem() {
      return this.alarms.map((alarm) => ({
        id: alarm.id,
        user_type: alarm.user_type,
        kpi: alarm.kpi,
        max_value: alarm.max_value,
        min_value: alarm.min_value,
      })) as Alarms[];
    },
    proxyModelValueAlarms: {
      get(user_type: string) {
        return this.mainStore.alarms as Alarms[];
      },
      set(alarm: Alarms) {
        this.onAddItem(alarm.id, alarm.kpi, alarm.min_value, alarm.max_value);
      },
    },
  },
});
</script>

<style>
.bell-icn {
  opacity: 40%;
}
.bell-icn:hover {
  opacity: 1;
}
.savedNotificationClass::before {
  opacity: 90%;
}
</style>
