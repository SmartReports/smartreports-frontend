<template>
  <v-container>
    <v-row>
      <h3 class="text-h4 mt-4">Dashes</h3>
      <v-spacer/>
      <v-btn
        class="text-grey-darken-1"
        @click="routeTemplateEditor"
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


    <v-container>
    <v-card-title>Your Dashes</v-card-title>
    <v-divider></v-divider>
    <v-row>

      <v-col v-for="(report, index) in reportsAsItem" :key="report.id" class ='grid'>
        <template-render :user_type="user_type" @delete="deleteTemplate(report.id)" :modelValue="report"></template-render>
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
import TemplateRender from "./TemplateRender/TemplateRender.vue";
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

        routeTemplateEditor() {

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

<style>
.grid {
  display: grid;
  grid-template-columns: repeat(5);
  gap: 10px
}
</style>
