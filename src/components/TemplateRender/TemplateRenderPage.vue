<template>
  <v-container>
    <v-row v-for="row in rows" :key="row">
      <v-col v-for="col in colsNum(row)" :key="col">
        <DashboardElementWrapper
          :options="false"
          :chart-configuration="charts_data[col*row]"
        ></DashboardElementWrapper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplatePage, KpiReportElement, ChartType } from "@/models";
import DashboardElement from '../DashboardElement.vue';
import { ChartConfiguration, ChartData } from "chart.js";
import DashboardElementWrapper from '../DashboardElementWrapper.vue';

export default {
  data() {
    return {
      numOfCharts: 0,
      rows: 0,
      pageKpis: [] as KpiReportElement[],
      cols: 0,
      default_chart_options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      charts_data: {} as { [key: string]: ChartConfiguration },
    };
  },
  props: {
    user_type: {
      type: String as PropType<string>,
      required: true,
    },
    modelPage: {
      type: Object as PropType<ReportTemplatePage>,
      required: true,
    },
  },
  created() {
    this.pageKpis = this.modelPage.elements as KpiReportElement[];
    this.numOfCharts = this.modelPage.elements.length;
    const { rows, cols } = this.calculateRowsAndCols();
    this.rows = rows==0?  1 : rows;
    this.cols = cols;
    this.getKpisData()
  },
  methods: {
    colsNum(row: number) {
      if(this.modelPage.layout=='grid')
        return this.numOfCharts - (row-1)*this.cols
      else return this.cols
    },
    calculateRowsAndCols() {
      const layoutType = this.modelPage.layout;
      switch (layoutType) {
        case 'grid':
          return { rows: Math.floor(this.modelPage.elements.length / 2) + 1, cols: 2 };
        case 'horizontal':
          return { rows: 1, cols: this.modelPage.elements.length };
        case 'vertical':
          return { rows: this.modelPage.elements.length, cols: 1 };
        default:
          console.error('Unsupported layout:', layoutType);
          return { rows: 0, cols: 0 };
      }
    },
    printDebug1(str: any){
      const name= 'loader: '
      console.log(name, str)
      return true
    },
    printDebug2(str: any){
      const name= 'dashboardel: '
      console.log(name, str)
      return true
    },
    async getKpisData() {
      await Promise.all(
        this.pageKpis.map(async (kpi) => {
          const type = kpi.chart_type as ChartType;
          const kpi_id = kpi.kpi as string;
          try {
            const chart_data = (
              await this.axios.get(`/kpi-data/${kpi_id}/?user_type=${this.user_type}&chart_type=${type}`)
            ).data['data'] as ChartData;

            this.charts_data[kpi_id] = {
              data: chart_data,
              options: this.default_chart_options,
              type: type,
            } as ChartConfiguration;
          } catch (error) {
            console.error('Error fetching data for KPI:', kpi_id, error);
          }
        })
      );
    },
  },
  components: { DashboardElement, DashboardElementWrapper },
};
</script>
