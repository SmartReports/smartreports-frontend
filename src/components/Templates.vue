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
          <v-list-item v-for="report in reportsAsItem" :key="report.id">
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
                <template-render :user_type="user_type" :modelValue="report"></template-render>
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
import { defineComponent, PropType } from "vue";
import { ReportTemplate, ReportTemplatePage } from "../models";
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import TemplateRender from "./TemplateRender/TemplateRender.vue";
export default defineComponent({
    props: {
      user_type: {
        type: String as PropType<string>,
        required: true,
      }
    },
    data() {
        return {
            reports: [
            ] as ReportTemplate[],
        };
    },
    methods: {
        async deleteTemplate(id: string| number |undefined) {
            if (id==undefined){
              alert("Are you sure you want to delete this report?");
              return;
            }
            if (!confirm("Are you sure you want to delete this report?")) {
                return;
            }
            this.mainStore.removeReport(id)
        },
    },
    computed: {
      ...mapStores(useMainStore),
      user_reports() {
        return this.mainStore.user_reports;
      },
      reportsAsItem() {
        return this.user_reports.map((report) =>  ({
          id: report.id,
          name: report.name,
          frequency: report.frequency,
          pages: report.pages as ReportTemplatePage[],
        })) as ReportTemplate[];
      },
    },
    components: { TemplateRender }
});
</script>
