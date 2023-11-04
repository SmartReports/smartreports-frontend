<template >
          <v-icon class="text-grey-darken-1 delete-button"
                  @click="onRemove()"
                  variant="text"
                  tooltip="Remove">mdi-delete</v-icon>
          <v-icon class="text-grey-darken-1 change-button"
                  @click="onChangeChart()"
                  variant="text"
                  tooltip="Remove">mdi-pencil</v-icon>
<!--      <v-menu>-->
<!--        <template v-slot:activator="{ props }">-->
<!--          <v-icon icon="mdi-dots-vertical" v-bind="props" class="delete-button"></v-icon>-->
<!--        </template>-->

<!--        <v-list>-->
<!--          <v-list-item>-->
<!--            <v-icon class="text-grey-darken-1"-->
<!--                    @click="onRemove()"-->
<!--                    variant="text"-->
<!--                    tooltip="Remove">mdi-delete</v-icon> Delete-->
<!--          </v-list-item>-->
<!--          <v-list-item>-->
<!--            <v-icon class="text-grey-darken-1"-->
<!--                    @click="onChangeChart()"-->
<!--                    variant="text"-->
<!--                    tooltip="Remove">mdi-pencil</v-icon> Change Chart-->
<!--          </v-list-item>-->
<!--        </v-list>-->
<!--      </v-menu>-->
      <Bar
        v-if="chartConfiguration.type === 'bar'"
        :options="barCastedOption"
        :data="barCastedData"
      />
      <Doughnut
        v-if="chartConfiguration.type === 'doughnut'"
        :options="doughnutCastedOption"
        :data="doughnutCastedData"
      />
      <Pie
        v-if="chartConfiguration.type === 'pie'"
        :options="pieCastedOption"
        :data="pieCastedData"
      />
      <Line
        v-if="chartConfiguration.type === 'line'"
        :options="lineCastedOption"
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
import {Chart as
  ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler} from 'chart.js'
import {defineComponent, PropType} from "vue";
import {ChartConfiguration} from 'chart.js';
import {
  BarChartData,
  DoughnutChartData,
  PieChartData,
  LineChartData,
  RadarChartData,
  BarChartOption,
  DoughnutChartOption,
  PieChartOption,
  LineChartOption,
  RadarChartOption
} from "@/models";

ChartJS.register(Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  ArcElement, RadialLinearScale, PointElement,
  LineElement, Filler)

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
    barCastedOption() {
      return (<BarChartOption>this.chartConfiguration.options);
    },
    doughnutCastedOption() {
      return (<DoughnutChartOption>this.chartConfiguration.options);
    },
    pieCastedOption() {
      return (<PieChartOption>this.chartConfiguration.options);
    },
    lineCastedOption() {
      return (<LineChartOption>this.chartConfiguration.options);
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
  },
  methods: {
    onRemove() {
      this.$emit("remove");
    },
  },
})
</script>

<style>
.delete-button {
  position: absolute;
  top: 5px; /* Adjust top positioning as needed */
  right: 10px; /* Adjust right positioning as needed */
  z-index: 1; /* Ensure the button is displayed on top of the plot */
  opacity: 60%;
}
.change-button {
  position: absolute;
  top: 5px; /* Adjust top positioning as needed */
  right: 35px; /* Adjust right positioning as needed *3
  z-index: 1; /* Ensure the button is displayed on top of the plot */
  opacity: 60%;
}
.delete-button:hover {
  opacity: 1.0;
}
.change-button:hover {
  opacity: 1.0;
}
</style>
