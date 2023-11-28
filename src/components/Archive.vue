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
          <v-list-item v-for="report in reports" :key="report.id">
            <v-row>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{ getName(report.id) }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{ report.created }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{ getFrequency(report.id) }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-btn @click="downloadReport(report.file)" height="30" width="90%"><v-icon>mdi-download</v-icon></v-btn>
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
import { defineComponent, PropType } from "vue";
import { useMainStore } from "../store/app";
import axios from "axios";
import { format } from 'date-fns';
import { ReportTemplate } from "@/models";

interface Report {
  id: number;
  created: string;
  file: string;
  user_type: string;
}

export default defineComponent({
  props: {
    user_type: {
      type: String as PropType<string>,
      required: true,
    },
  },
  data() {
    return {
      reports: [] as Report[],
      templates: [] as ReportTemplate[],

    };
  },
  methods: {
    async fetchReports() {
      try {
        const response = await axios.get("/report-archive/");
        const reports = response.data.map((report: any) => ({
          ...report,
          created: format(new Date(report.created), 'yyyy-MM-dd HH:mm:ss'),
        })) as Report[];
        this.reports = reports.filter(report => report.user_type === this.user_type);
        this.reports.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    },


    downloadReport(file: string) {
      window.open(file, '_blank');
    },

    async fetchReportTemplates() {
      try {
        const response = await axios.get("/report-templates/");
        this.templates = response.data;
      } catch (error) {
        console.error("Error fetching report templates:", error);
      }
    },

    getFrequency(reportId: number): string {
      const template = this.templates.find((t) => t.id === reportId);
      return template ? template.frequency : 'N/A';
    },

    getName(reportId: number): string {
      const template = this.templates.find((t) => t.id === reportId);
      return template ? template.name : 'N/A';
    },



  },
  watch: {
    user_type: 'fetchReports', // Watch for changes in user_type and call fetchReports
  },
  mounted() {
    this.fetchReports();
  },
});
</script>
