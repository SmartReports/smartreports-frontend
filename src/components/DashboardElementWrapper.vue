<template>
  <v-container :class="computedFilter()">
    <!-- <v-card rounded="lg" color="white" elevation="4"> -->
    <DashboardElementLoading v-if="chartConfiguration==undefined"></DashboardElementLoading>
    <DashboardElement
      v-else
      v-if="!refreshElement"
      @remove="$emit('remove')"
      @edit="$emit('edit')"
      @switchPredict="onSwitchPredict"
      :options="options"
      :chart-configuration="(chartConfigurationModified as ChartConfiguration)"
      :chart-title="chartTitle"
    />

    <div class="pt-8"></div>
    <!-- </v-card> -->
  </v-container>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import DashboardElementLoading from "./DashboardElementLoading.vue"
import DashboardElement from "./DashboardElement.vue"

export default defineComponent({
  emits: ['remove', 'edit', 'switchPredict'],
  props:{
    chartConfiguration: {
      type: undefined,
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
  data() {
    return {
      refreshElement: false,
    }
  },
  mounted() {
    this.$watch(
      () => {
        return this.$vuetify.theme.global.name
      },
      (val) => {
        if((this.chartConfiguration as any).type != "value" && (this.chartConfiguration as any).type != "semaphore"){
          this.refreshElement = true;
          setTimeout(function() {
            this.refreshElement = false;
          }.bind(this), 50);
        }
      }
    );
  },
  methods:{
    onSwitchPredict(predict: boolean){
      this.$emit('switchPredict', predict);
    },

    computedFilter: function() {
      return (this.$vuetify.theme as any).global.name == 'dark' ? "container_dark" : "container"
    },
  },
  computed: {
    chartConfigurationModified: function() {
      let modified = this.chartConfiguration as any;


      const textColor =  (this.$vuetify.theme as any).global.name == 'dark' ? 'white' : 'black'
      const gridColor =  (this.$vuetify.theme as any).global.name == 'dark' ? '#7D7D7D' : '#E0E0E0'
      if(modified.type !== "value" && modified.type !== "semaphore") {
        for (let i = 0; i < modified.data.datasets.length; i++) {
          if(modified.type === "pie" || modified.type === "doughnut" || modified.type === "bar") {
            modified.data.datasets[i].borderColor = (this.$vuetify.theme as any).global.name == 'dark' ? "#212121" : "#FFFFFF";
          }
        }

        modified.options.plugins.title.color = textColor
        modified.options.plugins.legend = {
          labels: {
            color: textColor,
          }
        };
      }

      if(modified.type === "radar") {
        modified.options.scales = {
          r: {
            angleLines: {
              color: gridColor
            },
            grid: {
              color: gridColor,
            },
            pointLabels: {
              color: textColor
            },
            ticks: {
              backdropColor: (this.$vuetify.theme as any).global.name == 'dark' ? "#212121" : "#FFFFFF"
            }
          }
        };
      }

      if(modified.type === "bar" || modified.type === "line" || modified.type === "scatter") {
        modified.options.scales = {
          x: {
            ticks: {color: textColor},
            grid: {color: gridColor}
          },
          y: {
            ticks: {color: textColor},
            grid: {color: gridColor}
          },
        }
      }

      return modified;
    }
  },
  components: { DashboardElementLoading, DashboardElement },
})
</script>


<style>
.container{
  min-height: 100%;
  max-height: 100%;
  box-shadow: 0 3px 100px rgb(0 0 0 / 0.1);
  border-radius: 15px;
}

.container_dark{
  min-height: 100%;
  max-height: 100%;
  box-shadow: 0 3px 30px rgb(0 0 0 / 0.1);
  border-radius: 15px;
  -webkit-filter: invert(0);
}

</style>
