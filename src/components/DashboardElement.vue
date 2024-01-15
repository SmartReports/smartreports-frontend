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
      <v-icon class="text-grey-darken-1 predict-button"
              :class="{ 'predict-button-active': predictActive && !isDark, 'predict-button-active-dark': predictActive && isDark }"
              v-if="options && chartConfiguration.type === 'line'"
              @click="onPredict()"
              variant="text"
              tooltip="Predict">mdi-trending-up</v-icon>
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
        style=""
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
      <div v-if="chartConfiguration.type === 'value'">
        <div class="text-center">
          <span v-text="chartTitle"/>
          <h1 ref="content" class="number"
              v-text="chartConfiguration.data.value"
          />
        </div>
      </div>

  <div v-if="chartConfiguration.type === 'semaphore'">
    <div class="text-center">
      <span v-text="chartTitle"/>
      <div class="container">
        <img ref="semaphore" src="../assets/semaphore/red.svg"
             v-if="chartConfiguration.data.color === 'red'"
             :style="imageStyle"
             :height="imgHeight"
             :width="imgWidth"

             alt=""/>
        <img ref="semaphore" src="../assets/semaphore/yellow.svg"
             v-if="chartConfiguration.data.color === 'yellow'"
             :style="imageStyle"
             :height="imgHeight"
             :width="imgWidth"
             alt=""
        />
        <img ref="semaphore" src="../assets/semaphore/green.svg"
             v-if="chartConfiguration.data.color === 'green'"
             :style="imageStyle"
             :height="imgHeight"
             :width="imgWidth"
             alt=""
        />
      </div>
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
import {defineComponent, PropType, StyleValue} from "vue";
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

ChartJS.register(Title, Tooltip, Legend,
  BarElement, CategoryScale, LinearScale,
  ArcElement, RadialLinearScale, PointElement,
  LineElement, Filler)

export default defineComponent ({
  name: 'DashboardElement',
  emits: ["remove", "edit", "switchPredict"],
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
      delete this.chartConfiguration.options.scales;
      return (<DoughnutChartOption>this.chartConfiguration.options);
    },
    pieCastedOption() {
      delete this.chartConfiguration.options.scales;
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

    isDark: function() {
      return (this.$vuetify.theme as any).global.name == 'dark';
    },
    //
    // invert_dark: function() {
    //   return (this.$vuetify.theme as any).global.name == 'dark' ? 'invert(1)' : 'invert(0)';
    // },
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
    if(this.chartConfiguration.type === 'value') {
      this.ro = new ResizeObserver(this.resizeText);
      this.ro.observe(this.$parent?.$el)
      this.resizeText(); // Call the function on mounted to set the initial font size
    }
    else if(this.chartConfiguration.type === 'semaphore') {
      this.ro = new ResizeObserver(this.resizeImage);
      this.ro.observe(this.$parent?.$el)
      this.resizeImage();
    }

    // this.imageStyle.filter = (this.$vuetify.theme.global.name == 'dark' ? 'invert(1)' : 'invert(0)')
    // this.$watch(
    //   () => {
    //     return this.$vuetify.theme.global.name
    //   },
    //   (val) => {
    //     this.imageStyle.filter = (val == 'dark' ? 'invert(1)' : 'invert(0)')
    //   }
    // )
  },
  beforeUnmount() {
    if(this.chartConfiguration.type === 'value') {
      this.ro.unobserve(this.$parent?.$el)
    }
    else if (this.chartConfiguration.type === 'semaphore') {
      this.ro.unobserve(this.$parent?.$el);
    }
  },
  data() {
    return {
      predictActive: false,
      ro: null as any,
      imgHeight: 329,
      imgWidth: 165,
      imageStyle: {
        transform: 'translate(-50%, -50%) rotate(90deg)',
        position: 'absolute',
        // top: '0',
        // left: '0',
      } as any,
    }
  },
  methods: {
    onRemove() {
      this.$emit("remove");
    },
    onEdit() {
      this.predictActive = false;
      this.$emit("switchPredict", false);
      this.$emit("edit");
    },
    onPredict() {
      this.predictActive = !this.predictActive;
      this.$emit("switchPredict", this.predictActive);
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

      const imgRatio = this.imgWidth / this.imgHeight;

      const idealWidth = (containerHeight - 70) * imgRatio;
      const idealHeight = (containerWidth - 20) / imgRatio;

      if(idealWidth < (containerWidth - 20)) {
        this.imgHeight = containerHeight - 70;
        this.imgWidth = idealWidth;
      }
      else {
        this.imgWidth = containerWidth - 20;
        this.imgHeight = idealHeight;
      }

      this.imageStyle.top = `${containerHeight / 2 + 15}px`;
      this.imageStyle.left = `${containerWidth / 2}px`;

      if(containerHeight > containerWidth) {
        this.imageStyle.transform = 'translate(-50%, -50%) rotate(0deg)';
      }
      else {
        this.imageStyle.transform = 'translate(-50%, -50%) rotate(90deg)';
      }
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
.predict-button {
  position: absolute;
  top: 5px; /* Adjust top positioning as needed */
  right: 60px; /* Adjust right positioning as needed */
  z-index: 1; /* Ensure the button is displayed on top of the plot */
  opacity: 60%;
  round-clip: 1px;
}
.predict-button-active {
  background-color: #c8c8c8;
  opacity: 1.0;
}
.predict-button-active-dark {
  background-color: #373737;
  opacity: 1.0;
}
.delete-button:hover {
  opacity: 1.0;
}
.change-button:hover {
  opacity: 1.0;
}
.predict-button:hover {
  opacity: 1.0
}

.number {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 0; /* Adjust top positioning as needed */
  left: 0;
  font-size: 10rem;
}

.dark-number {
  color: #1e1e1e;
}
</style>
