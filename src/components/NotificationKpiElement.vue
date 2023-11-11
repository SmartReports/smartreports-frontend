<template>
    <v-row >
        <v-col cols="12" md="4">
          <v-card-item>{{ getKpiName(alarm.kpi) }}</v-card-item>
        </v-col>
        <v-col cols="3" md="2" sm="3" xs="2">
          <v-text-field v-if="editing" type="number" v-model="kpimin" label="min"/>
          <v-card-item v-else>Min: {{ alarm.min_value }}</v-card-item>
        </v-col>
        <v-col  cols="3" md="2" sm="3" xs="2">
          <v-text-field v-if="editing" type="number" v-model="kpimax" label="max"/>
          <v-card-item v-else>Max: {{ alarm.max_value }}</v-card-item>
        </v-col>
        <v-col cols="3" md="2" sm="3" xs="1">
          <v-btn v-if="!editing" @click="editing=!editing" color="white" height="40" width="100%">
          <v-icon>
            mdi-pencil
          </v-icon>
          </v-btn>
          <v-btn v-else @click="$emit('update', alarm.id, alarm.kpi, kpimin, kpimax); editing=!editing" color="green" height="40" width="100%">
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
          <v-btn  v-else @click="$emit('delete', alarm.id)" color="red" height="40" width="100%">
          <v-icon>
            mdi-delete
          </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    <v-divider></v-divider>
</template>


<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import { Alarms } from '@/models';
export default {
  emits: ['update', 'delete'],
  data() {
    return {
      editing: false,
      kpimin: this.alarm.min_value,
      kpimax: this.alarm.max_value,
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
    alarm: {
      type: Object as PropType<Alarms>,
      required: true,
    }
  },
}
</script>
