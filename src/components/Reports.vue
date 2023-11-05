<template>
    <v-container>
      <h3 class="text-h4 mt-4">Reports</h3>
      <v-container>
        <v-list>
          <v-container>
          <v-list-item class="d-none d-sm-block">
            <v-row>
              <v-col cols="4">
                <v-card-title class="text-h5">Report Name</v-card-title>
              </v-col>
              <v-col cols="4">
                <v-card-title class="text-h5">Frequency</v-card-title>
              </v-col>
              <v-col cols="4">
                <v-card-title class="text-h5">Options</v-card-title>
              </v-col>
            </v-row>
          </v-list-item>
        </v-container>
          <v-divider></v-divider>
          <v-container>
          <v-list-item v-for="report in reports" :key="report.key">
            <v-row>
              <v-col cols="7" md="4" sm="4">
                <v-card-subtitle class="text-h6">{{ report.name }}</v-card-subtitle>
              </v-col>
              <v-col  cols="5" md="4" sm="4">
                <v-card-subtitle class="text-h6">{{ report.freq }}</v-card-subtitle>
              </v-col>
              <v-col cols="6" md="2" sm="2">
                <v-btn height="30" width="90%"><v-icon>mdi-pencil</v-icon></v-btn>
              </v-col>
              <v-col cols="6" md="2" sm="2">
                <v-btn height="30" width="90%"><v-icon>mdi-delete</v-icon></v-btn>
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
import { defineComponent } from 'vue';

export default defineComponent ({
  data() {
    return {
      reports: [
        {key: 1, name: "Report Name 1", freq: "Weekly"},
        {key: 2, name: "Report Name 2", freq: "Yearly"},
        {key: 3, name: "Report Name 3", freq: "Weekly"},
      ]
    }
  }
})
</script>
