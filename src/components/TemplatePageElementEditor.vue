<template>
  <v-row class="d-flex align-center">
    <v-col cols="5" class="d-flex align-center">
      <v-btn
        v-if="allow_remove"
        class="mr-1 ml-n3 text-grey-darken-1"
        variant="text"
        @click="onRemove()"
        icon="mdi-close"
      />
      <v-icon class="drag-handle mr-2 ml-n1" style="cursor: pointer"
          v-if="allow_remove"
        >mdi-drag-vertical</v-icon
      >
      <v-combobox
        hide-details="auto"
        :items="kpisAsItems"
        label="KPI"
        :multiple="true"
        v-model="proxyModelValueKpi"
      />
    </v-col>
    <v-col cols="6">
      <div
        v-if="kpisAllowedChartTypes.length > 0"
        class="d-flex align-start flex-column justify-center"
      >
        <!-- <div class="text-subtitle-2">Default</div> -->
        <v-btn-toggle
          style="height: 80px"
          class="border pa-0"
          v-model="proxyModelValueChartType"
          divided
          mandatory
        >
          <v-btn
            size="x-large"
            v-for="chartType in kpisAllowedChartTypes"
            :value="chartType"
            :key="chartType"
          >
            <v-img width="62" height="62" :src="getImgUrl(chartType)" />
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { KpiReportElement } from "../models";
import { mapStores } from "pinia";
import { ChartType } from "chart.js";
import { useMainStore } from "../store/app";
export default defineComponent({
  name: "TemplatePageElementEditor",
  props: {
    modelValue: {
      type: Object as PropType<KpiReportElement>,
      required: true,
    },
    allow_remove: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    getImgUrl(chartType: string) {
      return new URL(`../assets/${chartType}.png`, import.meta.url).href;
    },
    onRemove() {
      this.$emit("remove");
    },
  },
  computed: {
    ...mapStores(useMainStore),
    kpis() {
      return this.mainStore.kpis;
    },
    kpisAllowedChartTypes() {
      const selectedKpis = this.modelValue.kpis.map((kpi: any) => this.mainStore.getKpiById(kpi.value));
      // Ensure that there are selected KPIs
      if (selectedKpis.length > 0) {
        // Find the intersection of allowed chart types for selected KPIs
        const intersection = selectedKpis.reduce((commonChartTypes: any, kpi) => {
          const kpiChartTypes = kpi?.allowed_charts || [];
          return commonChartTypes.length === 0
            ? kpiChartTypes
            : commonChartTypes.filter((chartType: any) => kpiChartTypes.includes(chartType));
        }, [] as ChartType[]); // Provide an explicit type for the initial value

        return intersection;
      } else {
        return [];
      }
    },
    kpisAsItems() {
      return this.kpis.map((kpi) => ({
        title: kpi.kb_name,
        value: kpi.id,
      }));
    },
    proxyModelValueKpi: {
      get() {
        return this.modelValue.kpis;
      },
      set(value: any) {
        // TODO only update the value if it is a valid kpi, but keep the search value otherwise
        this.modelValue.kpis = value
      },
    },
    proxyModelValueChartType: {
      get() {
        if (
          !this.modelValue.chart_type ||
          !this.kpisAllowedChartTypes.includes(this.modelValue.chart_type)
        ) {
          this.proxyModelValueChartType = this.kpisAllowedChartTypes[0];
        }
        return this.modelValue.chart_type;
      },
      set(value: any) {
        this.modelValue.chart_type = value
      },
    },
  },
});
</script>

<style></style>
