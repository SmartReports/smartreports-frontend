<template>
      <DashboardElementLoading v-if="chartConfiguration==undefined"></DashboardElementLoading>
      <DashboardElement v-else @remove="$emit('remove')"
          @edit="$emit('edit')" :options="options" :chart-configuration="(chartConfiguration as ChartConfiguration)"></DashboardElement>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DashboardElementLoading from "./DashboardElementLoading.vue"
import DashboardElement from "./DashboardElement.vue"
import { ChartConfiguration } from "chart.js";
export default defineComponent({
  emits: ['remove', 'edit'],
  props:{
    chartConfiguration: {
      type: undefined,
      required: true,
    },
    options: {
      type: Boolean as PropType<Boolean>,
      required: false,
      default: true,
    }
  },
  components: { DashboardElementLoading, DashboardElement },
})
</script>
