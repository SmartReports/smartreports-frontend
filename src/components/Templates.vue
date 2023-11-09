<template>
  <v-container>
    <h3 class="text-h4 mt-4">Templates</h3>
    <v-container>
      <v-list>
        <v-container>
          <v-list-item class="d-none d-sm-block">
            <v-row>
              <v-col cols="7" md="4" sm="5">
                <v-card-title class="text-h5">Report Name</v-card-title>
              </v-col>
              <v-col cols="3" md="4" sm="4">
                <v-card-title class="text-h5">Frequency</v-card-title>
              </v-col>
              <v-col cols="2" md="4" sm="3">
                <v-card-title class="text-h5">Options</v-card-title>
              </v-col>
            </v-row>
          </v-list-item>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <v-list-item v-for="report in reports" :key="report.id">
            <v-row>
              <v-col cols="7" md="4" sm="5">
                <v-card-subtitle class="text-h6">{{
                  report.name
                }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="4" sm="4">
                <v-card-subtitle class="text-h6">{{
                  report.frequency
                }}</v-card-subtitle>
              </v-col>
              <v-col cols="2" md="4" sm="3">
                <v-btn
                  class="text-grey-darken-1"
                  icon="mdi-pencil"
                  variant="text"
                  tooltip="Edit"
                />
                <v-btn
                  class="text-grey-darken-1"
                  @click="deleteTemplate(report.id)"
                  icon="mdi-delete"
                  variant="text"
                  tooltip="Remove"
                />
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
import { ReportTemplate } from "../models";

export default defineComponent({
  async created() {
    this.reports = (await this.axios.get("/report-templates/")).data;
  },
  data() {
    return {
      reports: [
        // {key: 1, name: "Report Name 1", freq: "Weekly"},
        // {key: 2, name: "Report Name 2", freq: "Yearly"},
        // {key: 3, name: "Report Name 3", freq: "Weekly"},
      ] as ReportTemplate[],
    };
  },
  methods: {
    async deleteTemplate(id: string) {
      if (!confirm("Are you sure you want to delete this report?")) {
        return;
      }
      await this.axios.delete(`/report-templates/${id}/`);
      this.reports = this.reports.filter((report) => report.id != id);
    },
  },
});
</script>
