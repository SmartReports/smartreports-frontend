<template>
    <v-row >
        <v-col cols="12" md="4">
          <v-card-item>{{ getKpiName(KPIId) }}</v-card-item>
        </v-col>
        <v-col cols="3" md="2" sm="3" xs="2">
          <v-text-field v-if="editing" type="number" v-model="kpimin" label="min"/>
          <v-card-item v-else>Min: {{ KPIMin }}</v-card-item>
        </v-col>
        <v-col  cols="3" md="2" sm="3" xs="2">
          <v-text-field v-if="editing" type="number" v-model="kpimax" label="max"/>
          <v-card-item v-else>Max: {{ KPIMax }}</v-card-item>
        </v-col>
        <v-col cols="3" md="2" sm="3" xs="1">
          <v-btn v-if="!editing" @click="editing=!editing" color="white" height="40" width="100%">
          <v-icon>
            mdi-pencil
          </v-icon>
          </v-btn>
          <v-btn v-else @click="$emit('update', alarmId, KPIId, kpimin, kpimax); editing=!editing" color="green" height="40" width="100%">
          <v-icon>
            mdi-checkbox-marked-circle
          </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="3" md="2" sm="3" xs="1">
          <v-btn v-if="editing" @click="editing=!editing" color="red" height="40" width="100%">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
          <v-btn  v-else @click="$emit('delete', alarmId)" color="red" height="40" width="100%">
          <v-icon>
            mdi-delete
          </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    <v-divider></v-divider>
</template>


<script lang="ts">
import { PropType } from 'vue';
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import { emit } from 'process';
import NotificationBell from "NotificationBell.vue"
export default {
  data() {
    return {
      editing: false,
      kpimin: this.KPIMin,
      kpimax: this.KPIMax,
    }
  },
  methods: {
    getKpiName(index: string) {
        return this.mainStore.getKpiById(index)?.name
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
  props: {
    alarmId: {
      type: String as PropType<string>,
      required: true,
    },
    accountId: {
      type: String as PropType<string>,
      required: true,
    },
    KPIId: {
      type: String as PropType<string>,
      required: true,
    },
    KPIMin: {
      type: Number as PropType<number>,
      required: true,
    },
    KPIMax: {
      type: Number as PropType<number>,
      required: true,
    }
  },
}
</script>
