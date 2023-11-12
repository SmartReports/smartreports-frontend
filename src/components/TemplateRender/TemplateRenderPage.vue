<template>
  <v-container>
    <v-row v-for="row in rows" :key="row">
      <v-col v-for="col in RowCols(row)">
        <DashboardElementWrapper
          :options="false"
          :chart-configuration="charts_data[(2*row)+col-3]"
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
      doneElements: 0,
      pageKpis: [] as KpiReportElement[],
      cols: 0,
      current: 0,
      default_chart_options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      charts_data: {} as { [id: number]: ChartConfiguration},
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
  async created() {
    this.pageKpis = this.modelPage.elements as KpiReportElement[];
    this.numOfCharts = this.modelPage.elements.length;
    const { rows, cols } = this.calculateRowsAndCols();
    this.rows = rows==0?  1 : rows;
    this.cols = cols;
    await this.getKpisData()
  },
  methods: {
    RowCols(row: number) {
      if (row==this.rows && this.numOfCharts%2==1) {
        return 1
      }
      return this.cols
    },
    calculateRowsAndCols() {
      const layoutType = this.modelPage.layout;
      switch (layoutType) {
        case 'grid':
          return { rows: Math.floor(this.modelPage.elements.length / 2) +1 , cols: 2 };
        case 'horizontal':
          return { rows: 1, cols: this.modelPage.elements.length };
        case 'vertical':
          return { rows: this.modelPage.elements.length, cols: 1 };
        default:
          console.error('Unsupported layout:', layoutType);
          return { rows: 0, cols: 0 };
      }
    },
    printDebug1(str: number, str2: number){
      const name= 'loader: '
      console.log(name, str, str2, ((str*2)-1)+(str2-1))
      return true
    },
    printDebug2(str: any){
      const name= 'dashboardel: '
      console.log(name, str)
      return true
    },
    async getKpisData() {
      try {
        await Promise.all(
          this.pageKpis.map(async (kpi, index) => {
            const type = kpi.chart_type as ChartType;
            const kpi_id = kpi.kpi as string;


            try {
              // Use Vue.set to ensure reactivity
              this.charts_data[index] = {
                data: ( await this.axios.get(`/kpi-data/${kpi_id}/?user_type=${this.user_type}&chart_type=${type}`)).data['data'] as ChartData,
                options: this.default_chart_options,
                type: type,
              } as ChartConfiguration;
            } catch (error) {
              console.error('Error fetching data for KPI:', kpi_id, error);
            }
          })
        );
      } catch (error) {
        console.error('Error fetching KPI data:', error);
      }
  },
  },
  components: { DashboardElement, DashboardElementWrapper },
};
</script>
