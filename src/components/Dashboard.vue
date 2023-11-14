<template>
  <v-row class="d-flex align-center">
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
        hide-details="auto"
        v-model="smart_ordering"
        :label="smart_switch_tex"
      />
    </v-col>
    <v-col>
      <v-btn
        v-if="!smart_ordering"
        color="primary"
        target="_blank"
        variant="flat"
        @click="saveLayout"
      >
        <v-icon icon="mdi-content-save" />
        Save layout
      </v-btn>
    </v-col>
  </v-row>
  <div style="margin-top: 10px">
    <GridLayout
      v-model:layout="layout"
      :col-num="colNum"
      :cols="cols"
      :breakpoints="breakpoints"
      :row-height="250"
      :is-draggable="false"
      :is-resizable="false"
      :responsive="responsive"
      @breakpoint-changed="onBreakpointChanged"
    >
      <template #item="{ item }">
        <DashboardElementWrapper
          :chart-configuration="chart_map[item.i]"
          @remove="onChartRemove(item.i)"
          @edit="onChartEdit(item.i)"
        />
      </template>
    </GridLayout>
  </div>
</template>

<script lang="ts">
import DashboardElementWrapper from "@/components/DashboardElementWrapper.vue";
import { reactive, defineComponent, ref } from "vue";
import { Doughnut } from "vue-chartjs";
import DashboardDialog from "@/components/DashboardDialog.vue";
import { ChartType, KpiReportElement, Kpi } from "@/models";
import { mapStores } from "pinia";
import { useMainStore } from "@/store/app";
import {Breakpoint, Layout, LayoutItem} from "grid-layout-plus";
import {Chart, ChartConfiguration, ChartData} from "chart.js";
import { PropType } from "vue";

export default defineComponent({
  name: "Dashboard",
  async created() { },
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
      kpi_map: {} as { [key: number]: { kpi_id: string, chart_type: string } },
      chart_map: {} as { [key: number]: ChartConfiguration },
      dialogOpen: false,
      dialogModel: {
        chart_type: null,
        kpi: "",
      } as KpiReportElement,
      editing: -1,
      default_chart_options: {
        responsive: true,
        maintainAspectRatio: false
      },
      last_used_index: -1,
      layout_id: -1,
      current_breakpoint: "lg",
    };
  },
  methods: {
    async onAddChart() {
      let layout_id: number;
      if (this.editing != -1) {
        layout_id = this.editing;
        this.chart_map[layout_id] = (await this.getChart(this.dialogModel.kpi, this.dialogModel.chart_type))
        this.kpi_map[layout_id] = {
          kpi_id: this.dialogModel.kpi,
          chart_type: this.chart_map[layout_id].type
        };
        this.editing = -1;
      } else {
        layout_id = ++this.last_used_index;
        await this.addChart(layout_id, this.dialogModel.kpi, this.dialogModel.chart_type);
      }
    },

    onChartRemove(id: number) {
      const index = this.layout.findIndex((item) => item.i == id);

      if (index > -1) {
        this.layout.splice(index, 1);
        delete this.kpi_map[id];
      }
    },

    onChartEdit(layout_id: number) {
      this.editing = layout_id;
      const kpi_id = this.kpi_map[layout_id].kpi_id;
      const chart = this.chart_map[layout_id];
      this.dialogModel = {
        kpi: kpi_id,
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

    onBreakpointChanged(breakpoint: Breakpoint) {
      this.current_breakpoint = breakpoint;
      if(this.layout.length == 0) {
        this.getLayout();
      }
    },

    async getLayout() {
      try {
        const id_and_layout = (await this.axios.get(`/dashboard-layout/?user_type=${this.user_type}&display=${this.current_breakpoint}`)).data[0];

        this.layout_id = id_and_layout.id;
        let saved_layout = id_and_layout.layout;
        if (Object.keys(saved_layout).length == 0 || saved_layout.layout.length == 0) {
          throw new Error("empty layout");
        }

        const test = saved_layout.layout.map((l: LayoutItem) => l.i);
        this.last_used_index = Math.max(...test);
        this.layout = saved_layout.layout;
        this.kpi_map = saved_layout.kpi_map;
        const chart_promise = {} as { [key: number]: Promise<ChartConfiguration> };

        for (const layout_id in this.kpi_map)
        {
          chart_promise[layout_id] = this.getChart(this.kpi_map[layout_id].kpi_id, this.kpi_map[layout_id].chart_type as ChartType);
        }
        Object.keys(this.kpi_map).forEach(async (layout_id) => this.chart_map[parseInt(layout_id)] = await chart_promise[parseInt(layout_id)])
      } catch (error) {
        console.log(error)
        await this.getDefaultLayout();
        await this.saveLayout();
      }
    },

    async addChart(layout_id: number, kpi_id: string, chart_type: ChartType | null) {
      this.layout.push({x: this.layout.length * 2 % 4, y: this.layout.length + 1, w: 2, h: 1, i: layout_id});
      this.chart_map[layout_id] = (await this.getChart(kpi_id, chart_type));
      this.kpi_map[layout_id] = {
        kpi_id: kpi_id,
        chart_type: this.chart_map[layout_id].type
      };
    },

    clearDialogModel() {
      this.editing = -1;
      this.dialogModel = {
        chart_type: null,
        kpi: "",
      } as KpiReportElement;
    },

    async getChart(kpi_id: string, type: ChartType | null) {
      if (!type) {
        type = this.kpiAllowedChartTypes(kpi_id)[0];
      }
      let chart_data = (await this.axios.get(`/kpi-data/${kpi_id}/?user_type=${this.user_type}&chart_type=${type}`)).data["data"];
      return {
        data: chart_data,
        options: this.default_chart_options,
        type: type
      } as ChartConfiguration;
    },

     async getDefaultLayout() {
      for (let i=0; i < this.mainStore.kpi.length; i++)
      {
        const new_index = ++this.last_used_index;
        await this.addChart(new_index, this.mainStore.kpi[i].id, null);
      }
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
      }
    },

    async saveLayout() {
        let saved_layout = {
            layout: this.layout,
            kpi_map: this.kpi_map,
        };

        if (this.layout_id == -1) {
          await this.axios.post(`/dashboard-layout/`, {user_type: this.user_type, layout: saved_layout, display: this.current_breakpoint});
          const id_and_layout = (await this.axios.get(`/dashboard-layout/?user_type=${this.user_type}&display=${this.current_breakpoint}`)).data[0];
          this.layout_id = id_and_layout.id;
        }
        else {
          await this.axios.put(`/dashboard-layout/${this.layout_id}/`, {user_type: this.user_type, layout: saved_layout, display: this.current_breakpoint})
        }
    },

    kpiAllowedChartTypes(kpi_id: string) {
      return (
        this.mainStore.getKpiById(kpi_id)?.allowed_charts ?? []
      );
    },
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
  components: { DashboardDialog, Doughnut, DashboardElementWrapper },
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
