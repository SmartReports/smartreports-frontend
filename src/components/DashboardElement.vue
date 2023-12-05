<template>
      <v-icon class="text-grey-darken-1 delete-button"
              v-if="options"
              @click="onRemove()"
              variant="text"
              tooltip="Remove">mdi-delete</v-icon>
      <v-icon class="text-grey-darken-1 change-button"
              v-if="options"
              @click="onEdit()"
              variant="text"
              tooltip="Edit">mdi-pencil</v-icon>
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
      <Scatter
        v-if="chartConfiguration.type === 'scatter'"
        :options="scatterCastedOption"
        :data="scatterCastedData"
      />
      <div v-if="chartConfiguration.type === 'number'">
        <div class="text-center">
          <h3 v-text="chartTitle"/>
          <h1 ref="content" class="number" v-text="chartConfiguration.data"/>
        </div>
      </div>

  <div v-if="chartConfiguration.type === 'semaphore'">-->
    <div class="text-center">
      <h3 v-text="chartTitle"/>
      <v-img src="src/assets/semaphore/red.jpg"
             v-if="chartConfiguration.data === 'red'"
             :max-height="maxHeight"
             :max-width="maxWidth"/>
      <v-img src="src/assets/semaphore/yellow.jpg"
             v-if="chartConfiguration.data === 'yellow'"
             :max-height="maxHeight"
             :max-width="maxWidth"/>
      <v-img src="src/assets/semaphore/green.jpg"
             v-if="chartConfiguration.data === 'green'"
             :max-height="maxHeight"
             :max-width="maxWidth"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Bar, Doughnut, Pie, Line, Radar, Scatter } from 'vue-chartjs'
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
  ScatterChartData,
  BarChartOption,
  DoughnutChartOption,
  PieChartOption,
  LineChartOption,
  RadarChartOption,
  ScatterChartOption
} from "@/models";
import {FLOAT} from "html2canvas/dist/types/css/property-descriptors/float";

ChartJS.register(Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  ArcElement, RadialLinearScale, PointElement,
  LineElement, Filler)

export default defineComponent ({
  name: 'DashboardElement',
  emits: ["remove", "edit", "resizeHandler"],
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
    scatterCastedData() {
      return (<ScatterChartData>this.chartConfiguration.data);
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
    },
    scatterCastedOption() {
      return (<ScatterChartOption>this.chartConfiguration.options);
    },
  },
  components: { Bar, Doughnut, Pie, Line, Radar, Scatter },
  props: {
    chartConfiguration: {
      type: Object,
      required: true,
    },
    options: {
      type: Boolean as PropType<Boolean>,
      required: false,
      default: true,
    },
    chartTitle: {
      type: String as PropType<String>,
      required: true,
      default: ""
    },
  },
  mounted() {
    if(this.chartConfiguration.type === 'number') {
      this.ro = new ResizeObserver(this.resizeText);
      this.ro.observe(this.$parent?.$el)
      this.resizeText(); // Call the function on mounted to set the initial font size
    }
    this.ro = new ResizeObserver(this.resizeImage);
    this.ro.observe(this.$parent?.$el)
    this.resizeImage();
  },
  beforeUnmount() {
    if(this.chartConfiguration.type === 'number') {
      this.ro.unobserve(this.$parent?.$el)
    }
  },
  data() {
    return {
      ro: null as any,
      maxHeight: 0,
      maxWidth: 0
    }
  },
  methods: {
    onRemove() {
      this.$emit("remove");
    },
    onEdit() {
      this.$emit("edit");
    },
    resizeText() {
      const container: any = this.$parent?.$el;
      const content: any = this.$refs.content;

      const containerHeight = container.offsetHeight;
      const contentHeight = content.offsetHeight;

      const containerWidth = container.offsetWidth;
      const contentWidth = content.offsetWidth;

      const scaleFactorHeight = containerHeight / contentHeight;
      const scaleFactorWidth = containerWidth / contentWidth;
      const scaleFactor = Math.min(scaleFactorWidth, scaleFactorHeight)
      const newFontSize = parseFloat(window.getComputedStyle(content).fontSize) * scaleFactor * 0.9;

      content.style.top = `${containerHeight / 2}px`;
      content.style.left = `${containerWidth / 2}px`;
      content.style.fontSize = `${newFontSize}px`;
    },

    resizeImage() {
      const container: any = this.$parent?.$el;

      const containerHeight = container.offsetHeight;
      const containerWidth = container.offsetWidth;

      this.maxHeight = containerHeight;
      this.maxWidth = containerWidth;
    }
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
  right: 35px; /* Adjust right positioning as needed */
  z-index: 1; /* Ensure the button is displayed on top of the plot */
  opacity: 60%;
}
.delete-button:hover {
  opacity: 1.0;
}
.change-button:hover {
  opacity: 1.0;
}

.number {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 0; /* Adjust top positioning as needed */
  left: 0;
  font-size: 10rem;
}
</style>
