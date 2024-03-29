<template>
  <div>
    <v-row v-for="row in rows" :key="row">
      <v-col  v-for="col in RowCols(row)">
        <v-card-title>{{ getChartTitle (kpi_id_mapping[getIndex(row, col)]) }}</v-card-title>
        <v-container class="d-flex-fill justify-center align-center">
          <v-card height="310" min-width="400" elevation="5" color="white" variant="tonal" class="rounded-xl">
            <DashboardElementWrapper
            :options="false"
            :chart-configuration="charts_data[getIndex(row, col)]"
            ></DashboardElementWrapper>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplatePage, KpiReportElement, ChartType } from "@/models";
import DashboardElement from '../DashboardElement.vue';
import { ChartConfiguration, ChartData } from "chart.js";
import DashboardElementWrapper from '../DashboardElementWrapper.vue';
import { useMainStore } from "@/store/app";
import { mapStores } from "pinia";
import { ro, th } from 'date-fns/locale';
export default {
  data() {
    return {
      numOfCharts: 0,
      rows: 0,
      doneElements: 0,
      pageKpis: [] as KpiReportElement[],
      cols: 0,
      current: 0,
      charts_data: {} as { [id: number]: ChartConfiguration},
      kpi_id_mapping: {} as { [id: number]: string[]},
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
    getChartTitle(kpi_ids: string[]){
      const kpi_names = kpi_ids.map((id) => this.mainStore.getKpiById(id)?.kb_name);
      let title: string = "";
      kpi_names.forEach((name) => {
        title += " / " + name;
      })
      return title.slice(3);
    },
    RowCols(row: number) {
      if (row==this.rows && this.numOfCharts%2==1) {
        return 1
      }
      return this.cols
    },
    calculateRowsAndCols() {
      const layoutType = this.modelPage.layout;
      let add = this.modelPage.elements.length%2 == 0? 0:1
      switch (layoutType) {
        case 'grid':
          let rows= Math.floor(this.modelPage.elements.length / 2) + add
          rows = rows==0? 1:rows
          return { rows: rows , cols: 2 };
        case 'vertical':
          return { rows: 1, cols: this.modelPage.elements.length };
        case 'horizontal':
          return { rows: this.modelPage.elements.length, cols: 1 };
        default:
          console.error('Unsupported layout:', layoutType);
          return { rows: 0, cols: 0 };
      }
    },
    getIndex(row: number, col: number){
      if (this.modelPage.layout == 'horizontal'){
        // console.log("Layout : Horizontal", this.rows, row)
        return row-1
      }else if (this.modelPage.layout == 'vertical'){
        // console.log("Layout : vertical", this.cols, col)
        return col-1
      }else if (this.modelPage.layout == 'grid'){
        // console.log("Layout : grid", this.rows, this.cols, row,col, (2*row)+col-3)
        return (2*row)+col-3
      }
      return 0;
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
            const kpi_id = kpi.kpis as string[];

            try {
              // Use Vue.set to ensure reactivity
              this.kpi_id_mapping[index] = kpi_id;
              this.charts_data[index] = {
                data: ( await this.axios.get(`/kpi-data/?kpis=${kpi_id}&user_type=${this.user_type}&chart_type=${type}`)).data['data'] as ChartData,
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: false,
                      text: this.getChartTitle(kpi_id)
                    }
                  }
                },
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
  computed: {
    ...mapStores(useMainStore),
  },
  components: { DashboardElement, DashboardElementWrapper },
};
</script>
