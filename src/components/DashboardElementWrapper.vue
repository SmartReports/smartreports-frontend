<template>
          <v-container :class="computedFilter()">
            <!-- <v-card rounded="lg" color="white" elevation="4"> -->
              <DashboardElementLoading v-if="chartConfiguration==undefined"></DashboardElementLoading>
              <DashboardElement v-else
                @remove="$emit('remove')"
                @edit="$emit('edit')"
                @switchPredict="onSwitchPredict"
                :options="options"
                :chart-configuration="(chartConfiguration as ChartConfiguration)"
                :chart-title="chartTitle"
              />
              <div class="pt-8"></div>
            <!-- </v-card> -->
          </v-container>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DashboardElementLoading from "./DashboardElementLoading.vue"
import DashboardElement from "./DashboardElement.vue"
import { ChartConfiguration } from "chart.js";
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
  methods:{
    onSwitchPredict(predict: boolean){
      this.$emit('switchPredict', predict);
    },

    computedFilter: function() {
      return (this.$vuetify.theme as any).global.name == 'dark'? "container_dark" : "container"
    },
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
  -webkit-filter: invert();
}

</style>
