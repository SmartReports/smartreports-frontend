<template>
    <v-row>
            <v-col cols="12" md="4">
              <v-card-item>{{ KPIName }}</v-card-item>
            </v-col>
            <v-col cols="3" md="2" sm="3" xs="2">
              <v-card-item>Min: {{ KPIMin }}</v-card-item>
            </v-col>
            <v-col  cols="3" md="2" sm="3" xs="2">
              <v-card-item>Max: {{ KPIMax }}</v-card-item>
            </v-col>
            <v-col cols="3" md="2" sm="3" xs="1">
              <v-btn color="green" height="40" width="100%">
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
export default {
  data() {
    return {
      min: 1,
      max: 2,
    }
  },
  props: {
    KPIMin: {
      type: Number,
      required: true,
    },
    KPIMax: {
      type: Number,
      required: true,
    },
    KPIName: {
      type: String,
      required: true,
    }
  }
}
</script>
