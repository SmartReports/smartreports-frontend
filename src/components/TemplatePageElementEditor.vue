<template>
  <v-row class="d-flex align-center">
    <v-col cols="5" class="d-flex align-center">
      <v-btn
        v-if="allow_remove"
        class="mr-1 ml-n3 text-grey-darken-1"
        variant="text"
        @click="onRemove()"
        icon="mdi-close"
      />
      <v-icon class="drag-handle mr-2 ml-n1" style="cursor: pointer"
        >mdi-drag-vertical</v-icon
      >
      <v-combobox
        hide-details="auto"
        :items="kpiAsItems"
        label="KPI"
        v-model="proxyModelValueKpi"
      />
    </v-col>
    <v-col cols="6">
      <div
        v-if="kpiAllowedChartTypes.length > 0"
        class="d-flex align-start flex-column justify-center"
      >
        <!-- <div class="text-subtitle-2">Default</div> -->
        <v-btn-toggle
          style="height: 80px"
          class="border pa-0"
          v-model="proxyModelValueChartType"
          divided
          mandatory
        >
          <v-btn
            size="x-large"
            v-for="chartType in kpiAllowedChartTypes"
            :value="chartType"
            :key="chartType"
          >
            <v-img width="62" height="62" :src="getImgUrl(chartType)" />
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { KpiReportElement } from "../models";
import { mapStores } from "pinia";
import { useMainStore } from "../store/app";
export default defineComponent({
  name: "TemplatePageElementEditor",
  props: {
    modelValue: {
      type: Object as PropType<KpiReportElement>,
      required: true,
    },
    allow_remove: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    getImgUrl(chartType: string) {
      return new URL(`../assets/${chartType}.png`, import.meta.url).href;
    },
    onUpdate<K extends keyof KpiReportElement>(
      key: K,
      value: KpiReportElement[K]
    ) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [key]: value,
      });
    },
    onRemove() {
      this.$emit("remove");
    },
  },
  computed: {
    ...mapStores(useMainStore),
    kpi() {
      return this.mainStore.kpi;
    },
    kpiAllowedChartTypes() {
      return (
        this.mainStore.getKpiById(this.modelValue.kpi)?.allowed_charts ?? []
      );
    },
    kpiAsItems() {
      return this.kpi.map((kpi) => ({
        title: kpi.name,
        value: kpi.id,
      }));
    },
    modelValueKpiAsItem() {
      // TODO  workaround for v-combobox to make search work - find a better way
      const kpi = this.mainStore.getKpiById(this.modelValue.kpi);
      if (!kpi) {
        return this.modelValue.kpi;
      }
      return {
        title: kpi.name,
        value: this.modelValue.kpi,
      };
    },
    proxyModelValueKpi: {
      get() {
        return this.modelValueKpiAsItem;
      },
      set(value: any) {
        // TODO only update the value if it is a valid kpi, but keep the search value otherwise
        this.onUpdate("kpi", value.value);
      },
    },
    proxyModelValueChartType: {
      get() {
        if (
          !this.modelValue.chart_type ||
          !this.kpiAllowedChartTypes.includes(this.modelValue.chart_type)
        ) {
          this.proxyModelValueChartType = this.kpiAllowedChartTypes[0];
        }
        return this.modelValue.chart_type;
      },
      set(value: any) {
        this.onUpdate("chart_type", value);
      },
    },
  },
});
</script>

<style></style>
