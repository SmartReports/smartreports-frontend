<template>
    <v-container>
        <v-row v-for="row in rows">
            <v-col v-for="col in cols">
                <DashboardElement v-if="(row*col)<=numOfCharts" :options="false" :chart-configuration="getKpisData(pageKpis[(row*col)])"></DashboardElement>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplatePage, KpiReportElement, ChartType } from "@/models"
import DashboardElement from '../DashboardElement.vue';
import {ChartConfiguration, ChartData } from "chart.js"
export default {
    data() {
        return {
          numOfCharts: 0,
          rows: 0,
          pageKpis: [] as KpiReportElement[],
          counter: 0,
          cols: 0,
          default_chart_options: {
            responsive: true,
            maintainAspectRatio: false
          },
          charts_data: {} as { [key: string]: ChartConfiguration },
        }
    },
    props: {
        user_type: {
          type: String as PropType<String>,
          required: true,
        },
        modelPage: {
          type: Object as PropType<ReportTemplatePage>,
          required: true,
        }
    },
    created() {
      this.pageKpis = this.modelPage.elements as KpiReportElement[];
      this.numOfCharts = this.modelPage.elements.length;
      const { rows, cols } = this.calculateRowsAndCols();
      this.rows = rows;
      this.cols = cols;
    },
    methods: {
      calculateRowsAndCols() {
        const layoutType = this.modelPage.layout;
        switch (layoutType) {
          case 'grid':
            return { rows: Math.floor(this.modelPage.elements.length / 2) + 1, cols: 2 };
          case 'horizontal':
            return { rows: 1, cols: this.modelPage.layout.length };
          case 'vertical':
            return { rows: this.modelPage.layout.length, cols: 1 };
          // Add more cases for additional layout types
          default:
            // Handle unsupported layout
            console.error('Unsupported layout:', layoutType);
            return { rows: 0, cols: 0 };
        }
      },
      async getKpisData(kpi: KpiReportElement) {
        const type = kpi.chart_type as ChartType
        const kpi_id = kpi.kpi as string
        const chart_data = (await this.axios.get(`/kpi-data/?user_type=${this.user_type}&chart_type=${type}&kpi_id=${kpi_id}`)).data as ChartData
        return {
          data: chart_data,
          options: this.default_chart_options,
          type: type,
        } as ChartConfiguration;
      }
    },
    computed: {

    },
    components: { DashboardElement }
}
</script>
