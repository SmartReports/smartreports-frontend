<template>
    <v-row >
            <v-col cols="12" md="4">
              <v-card-item>{{ getKpiName(KPIId) }}</v-card-item>
            </v-col>
            <v-col cols="3" md="2" sm="3" xs="2">
              <v-card-item>Min: {{ KPIMin }}</v-card-item>
            </v-col>
            <v-col  cols="3" md="2" sm="3" xs="2">
              <v-card-item>Max: {{ KPIMax }}</v-card-item>
            </v-col>
            <v-col cols="3" md="2" sm="3" xs="1">
              <v-btn @click="$emit('update', 1, 4)" color="green" height="40" width="100%">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            </v-col>
            <v-col cols="3" md="2" sm="3" xs="1">
              <v-btn @click="$emit('delete')" color="red" height="40" width="100%">
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
  methods: {
    getKpiName(index: string) {
        return this.mainStore.getKpiById(index)?.name
    },
  },
  computed: {
    ...mapStores(useMainStore),
  },
  props: {
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
