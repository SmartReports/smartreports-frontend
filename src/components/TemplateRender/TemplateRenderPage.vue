<template>
    <v-container>
        <v-row v-for="row in rows">
            <v-col v-for="col in cols">
                <DashboardElement :chart-configuration="getNext" :options="false"></DashboardElement>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ReportTemplatePage, KpiReportElement, ChartType } from "@/models"
import DashboardElement from '../DashboardElement.vue';
import {ChartConfiguration } from "chart.js"
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
          chart_data: {} as { [key: string]: ChartConfiguration },
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
      if (this.modelPage.layout == 'grid'){
        this.rows = (this.modelPage.elements.length)/2;
        this.cols = 2;
      }else {
        if (this.modelPage.layout == 'horizontal'){
          this.rows = 1;
          this.cols = this.modelPage.layout.length;
        }else{
          if (this.modelPage.layout == 'vertical')
            this.rows = this.modelPage.layout.length;
            this.cols = 1;
        }
      }
      this.numOfCharts = this.modelPage.elements.length;
      this.pageKpis = this.modelPage.elements;
      this.pageKpis.forEach(async (kpi) => {
        const type = kpi.chart_type as ChartType
        const kpi_id = kpi.kpi as string
        this.chart_data[kpi_id] = {
          data: (await this.axios.get(`/kpi-data/?user_type=${this.user_type}&chart_type=${type}&kpi_id=${kpi_id}`)).data["data"],
          options: this.default_chart_options,
          type: type
        } as ChartConfiguration
      })
    },
    methods: {
      getNext() {
        return this.chart_data[this.counter++];
      }
    },
    computed: {},
    components: { DashboardElement }
}
</script>
