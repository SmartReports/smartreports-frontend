<template>
  <v-container>
    <v-row>
      <h3 class="text-h4 mt-4">Dashes</h3>
      <v-spacer/>
      <v-btn
        class="text-grey-darken-1"
        to="/templateeditor"
        icon="mdi-plus"
        variant="text"
        tooltip="Add"
      />
    </v-row>
    <div class="pt-4"></div>

    <v-container>
      <v-card-title>Suggested Dashes</v-card-title>
      <v-divider></v-divider>
      <div class="pt-12"></div>
    </v-container>
    <v-row>
      <v-col cols="3" v-for="(report, index) in suggestedReportsAsItem" :key="report.id" class ='grid'>
        <mini-dash :user_type="user_type" :options="false" :modelValue="report"></mini-dash>
      </v-col>
    </v-row>
    <v-container>
    <v-card-title>Your Dashes</v-card-title>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="3" v-for="(report, index) in reportsAsItem" :key="report.id" class ='grid'>
        <mini-dash :user_type="user_type" @delete="deleteTemplate(report.id)" :modelValue="report"></mini-dash>
      </v-col>
    </v-row>
</v-container>

  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReportTemplate, ReportTemplatePage } from "../models";
import { useMainStore } from "../store/app";
import { mapStores } from "pinia";
import MiniDash from "./Dashes/MiniDash.vue";
export default defineComponent({
    emits: ['delete'],
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
            cols: 4,
        };
    },
    created(){
      this.mainStore.getSuggestedReports(this.user_type)
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
      user_suggested_reports(){
        return this.mainStore.user_suggested_reports;
      },
      user_reports() {
        return this.mainStore.user_reports;
      },
      reportsAsItem() {
        return this.user_reports.map((report) =>  ({
          id: report.id,
          name: report.name,
          frequency: report.frequency,
          pages: report.pages as ReportTemplatePage[],
          img: report.img as String,
        })) as ReportTemplate[];
      },
      suggestedReportsAsItem() {
        return this.user_suggested_reports.map((report) =>  ({
          id: report.id,
          name: report.name,
          frequency: report.frequency,
          pages: report.pages as ReportTemplatePage[],
          img: report.img as String,
        })) as ReportTemplate[];
      },
    },
    components: { MiniDash }
});
</script>

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(5);
  gap: 10px
}
</style>
