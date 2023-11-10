<template>
  <v-row>
    <v-col>
      <v-btn
        color="primary"
        target="_blank"
        variant="flat"
        @click="clearDialogModel()"
      >
        <v-icon icon="mdi-plus" />
        Add Chart
        <DashboardDialog
          :modelValue="dialogModel"
          :dialogOpen="dialogOpen"
          @update:modelValue="onUpdateDialogModel($event)"
          @update:dialogOpen="onUpdateDialogOpen($event)"
          @save="onAddChart()"
        />
      </v-btn>
    </v-col>
    <v-col>
      <v-switch
        v-model="smart_ordering"
        :label="smart_switch_tex"
      />
    </v-col>
  </v-row>
  <div style="margin-top: 10px">
    <GridLayout
      v-model:layout="layout"
      :col-num="colNum"
      :cols="cols"
      :breakpoints="breakpoints"
      :row-height="250"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="responsive"
      @breakpoint-changed="breakpointChanged"
    >
      <template #item="{ item }">
        <DashboardElement
          :chart-configuration="charts[item.i]"
          @remove="onChartRemove(item.i)"
          @edit="onChartEdit(item.i)"
        />
      </template>
    </GridLayout>
  </div>
</template>

<script lang="ts">
import DashboardElement from "@/components/DashboardElement.vue";
import { reactive, defineComponent, ref } from "vue";
import {
  test_chart1,
  test_chart2,
  test_chart3,
  test_chart4,
} from "./test_charts";
import { Doughnut } from "vue-chartjs";
import DashboardDialog from "@/components/DashboardDialog.vue";
import { ChartType, KpiReportElement, Kpi } from "@/models";
import { mapStores } from "pinia";
import { useMainStore } from "@/store/app";
import {Breakpoint, Layout} from "grid-layout-plus";
import {ChartConfiguration} from "chart.js";
import { PropType } from "vue";

export default defineComponent({
  name: "Dashboard",
  async created() {
    await this.mainStore.getKpi(undefined);
    try {
      const layout_string = (await this.axios.get("/matteo_gay/", {params: {user: "Caterina"}})).data;
      this.layout = reactive(JSON.parse(layout_string));
    } catch (error) {
      console.log(error)
      this.getDefaultLayout();
    }

  },
  props: {
    user_type: {
      type: String as PropType<string>,
      required: true,
    }
  },
  data() {
    return {
      smart_ordering: false,
      resizable: true,
      responsive: true,
      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      cols: { lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 },
      colNum: 4,
      layout: reactive([]) as Layout,
      old_layout: reactive([]) as Layout,
      charts: {} as { [key: string]: ChartConfiguration },
      dialogOpen: false,
      dialogModel: {
        chart_type: null,
        kpi: "",
      } as KpiReportElement,
      editing: "",
    };
  },
  methods: {
    breakpointChanged(newBreakpoint: Breakpoint, newLayout: Layout) {
      console.log(newBreakpoint);
      this.colNum = this.cols[newBreakpoint];
    },

    onAddChart() {
      if (this.editing !== "") {
        // backend call
        this.editing = "";
      } else {
        this.layout.push({
          x: (this.layout.length * 2) % 4,
          y: this.layout.length + 1, // puts it at the bottom
          w: 2,
          h: 1,
          i: this.dialogModel.kpi,
        });
        this.charts[this.dialogModel.kpi] = test_chart2;
      }
    },

    onChartRemove(id: string) {
      console.log(this.user_type)

      const index = this.layout.findIndex((item) => item.i == id);

      if (index > -1) {
        this.layout.splice(index, 1);
        delete this.charts[id];
      }
    },

    onChartEdit(id: string) {
      this.editing = id;
      const chart = this.charts[id];
      this.dialogModel = {
        kpi: id,
        chart_type: chart.type as ChartType,
      };
      this.dialogOpen = true;
    },

    onUpdateDialogModel(value: any) {
      this.dialogModel = value;
    },

    onUpdateDialogOpen(value: boolean) {
      this.dialogOpen = value;
    },

    clearDialogModel() {
      this.editing = "";
      this.dialogModel = {
        chart_type: null,
        kpi: "",
      } as KpiReportElement;
    },

    getNextCoordinates: function (x: number, y: number) {
      if (x + 2 >= this.colNum) {
        x = 0;
        y++;
      } else {
        x += 2;
      }
      return [x, y];
    },

    getDefaultLayout() {
      let default_layout: Layout = reactive([]);
      let default_charts: { [key: string]: ChartConfiguration } = {};
      this.mainStore.kpi.forEach((kpi) => {
        default_layout.push({x: default_layout.length * 2 % 4, y: default_layout.length + 1, w: 2, h: 1, i: kpi.id});
        default_charts[kpi.id] = test_chart1;
      });
      this.layout = default_layout;
      this.charts = default_charts;
    },

    orderLayout() {
      this.old_layout = this.layout
      const orderedKpi = this.mainStore.kpi.sort((a, b) => {
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) {return 1}
        return 0
      });

      let x = 0;
      let y = 0;
      for (let i=0; i < this.layout.length; i++) {
        let layout_item = this.layout.find((item) => item.i === orderedKpi[i].id );
        if (!layout_item) {
          continue
        }
        layout_item.x = x;
        layout_item.y = y;
        layout_item.w = 2;
        layout_item.h = 1;
        [x, y] = this.getNextCoordinates(x, y);
      }
    }
  },
  watch: {
      smart_ordering(new_value) {
        if (new_value) {
          this.orderLayout();
        }
        else {
          this.layout = this.old_layout
        }
      }
  },
  computed: {
    ...mapStores(useMainStore),
    smart_switch_tex() {
      return this.smart_ordering ? "Smart ordering" : "Custom ordering";
    },
    draggable() { return !this.smart_ordering },
  },
  components: { DashboardDialog, Doughnut, DashboardElement },
});
</script>

<style scoped>
.vgl-layout {
  background-color: var(--v-theme-background);
  --vgl-placeholder-bg: rgb(128, 128, 128);
  --vgl-placeholder-opacity: 10%;
  border-radius: 15px;
}

:deep(.vgl-item--placeholder) {
  border-radius: 40px;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
  border: 1px solid var(--v-theme-secondary);
  border-radius: 40px;
}

:deep(.vgl-item--resizing) {
  opacity: 30%;
  border-radius: 15px;
}

:deep(.vgl-item--static) {
  background-color: var(--v-theme-primary);
}

.text {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  font-size: 24px;
  text-align: center;
}
</style>
