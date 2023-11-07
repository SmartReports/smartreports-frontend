<template>
  <v-container>
    <h3 class="text-h4 mt-4">Archive</h3>
    <v-container>
      <v-list>
        <v-container>
          <v-list-item class="d-none d-sm-block">
            <v-row>
              <v-col cols="3">
                <v-card-title class="text-h5">Report Name</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title class="text-h5">Date</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title class="text-h5">Report Type</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title class="text-h5">Download</v-card-title>
              </v-col>
            </v-row>
          </v-list-item>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <v-list-item v-for="report in reports" :key="report.key">
            <v-row>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{ report.name }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{ report.date }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{ report.freq }} report</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-btn height="30" width="90%"><v-icon>mdi-download</v-icon></v-btn>
              </v-col>
              <v-divider></v-divider>
            </v-row>
          </v-list-item>
        </v-container>
      </v-list>
    </v-container>
  </v-container>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      reports: [
        { key: 1, name: "Report Name 1", date: "01.04.2023", freq: "Weekly" },
        { key: 2, name: "Report Name 2", date: "08.04.2023", freq: "Yearly" },
        { key: 3, name: "Report Name 3", date: "15.04.2023", freq: "Monthly" },
      ],
    };
  },
});
</script>
