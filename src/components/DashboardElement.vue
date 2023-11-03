<template>
  <Bar
    v-if="chartConfiguration.type === 'bar'"
    :options="chartConfiguration.options"
    :data="barCastedData"
  />
  <Doughnut
    v-if="chartConfiguration.type === 'doughnut'"
    :options="chartConfiguration.options"
    :data="doughnutCastedData"
  />
  <Pie
    v-if="chartConfiguration.type === 'pie'"
    :options="chartConfiguration.options"
    :data="pieCastedData"
  />
  <Line
    v-if="chartConfiguration.type === 'line'"
    :options="chartConfiguration.options"
    :data="lineCastedData"
  />
  <Radar
    v-if="chartConfiguration.type === 'radar'"
    :options="radarCastedOption"
    :data="radarCastedData"
  />
</template>

<script lang="ts">
import { Bar, Doughnut, Pie, Line, Radar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {defineComponent, PropType} from "vue";
import {ChartConfiguration} from 'chart.js';
import {
  BarChartData,
  DoughnutChartData,
  PieChartData,
  LineChartData,
  RadarChartData,
  RadarChartOption
} from "@/models";


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent ({
  name: 'DashboardElement',
  computed: {
    barCastedData() {
      return (<BarChartData>this.chartConfiguration.data);
    },
    doughnutCastedData() {
      return (<DoughnutChartData>this.chartConfiguration.data);
    },
    pieCastedData() {
      return (<PieChartData>this.chartConfiguration.data);
    },
    lineCastedData() {
      return (<LineChartData>this.chartConfiguration.data);
    },
    radarCastedData() {
      return (<RadarChartData>this.chartConfiguration.data);
    },
    radarCastedOption() {
      return (<RadarChartOption>this.chartConfiguration.options);
    }
  },
  components: { Bar, Doughnut, Pie, Line, Radar },
  props: {
    chartConfiguration: {
      type: Object as PropType<ChartConfiguration>,
      required: true,
    },
  },
  data() {
    return {}
  }
})
</script>
