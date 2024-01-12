<template>
  <v-container>
    <h3 class="text-h4 mt-4">Archive</h3>
    <v-container :class="{ 'px-0': $vuetify.display.smAndDown }">
      <v-list>
        <v-container :class="{ 'px-0': $vuetify.display.smAndDown }">
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
        <v-container :class="{ 'px-0': $vuetify.display.smAndDown }">
          <v-list-item
            v-for="report in archived_reportsAsItem"
            :key="report.id"
          >
            <v-row>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{
                  report.name
                }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{
                  report.created
                }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-card-subtitle class="text-h6">{{
                  report.frequency
                }}</v-card-subtitle>
              </v-col>
              <v-col cols="3" md="3" sm="3">
                <v-btn
                  @click="downloadPDF(report.file, report.file_name)"
                  height="30"
                  width="90%"
                  ><v-icon>mdi-download</v-icon></v-btn
                >
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
import { mapStores } from "pinia";

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
      reports: [],
    };
  },
  computed: {
    ...mapStores(useMainStore),
    archived_reports() {
      return this.mainStore.archived_reports;
    },
    archived_reportsAsItem() {
      return this.archived_reports.map((report: any) => ({
        id: report.id,
        created: report.created,
        user_type: report.user_type,
        file: report.file,
        file_name: report.file_name,
        template: report.template,
        name: this.mainStore.user_reports.filter(
          (r) => r.id == report.template
        )[0].name,
        frequency: this.mainStore.user_reports.filter(
          (r) => r.id == report.template
        )[0].frequency,
      })) as any[];
    },
  },
  methods: {
    downloadPDF(file: string, file_name: string) {
      const downloadLink = document.createElement("a");
      downloadLink.href = file;
      downloadLink.download = file_name;
      downloadLink.click();
    },
  },
});
</script>
