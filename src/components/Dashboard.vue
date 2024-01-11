<template>
  <v-row class="d-flex align-center">
    <div class="px-2"></div>
    <v-col cols="3">
      <v-btn
        color="primary"
        target="_blank"
        variant="flat"
        icon="mdi-plus"
        tooltip="Add"
        @click="clearDialogModel()"
      />
        <DashboardDialog
          :modelValue="dialogModel"
          :dialogOpen="dialogOpen"
          @update:modelValue="onUpdateDialogModel($event)"
          @update:dialogOpen="onUpdateDialogOpen($event)"
          @save="onAddChart()"
        />
    </v-col>
    <v-col>
      <v-switch
        hide-details="auto"
        v-model="smart_ordering"
        inset
        :label="smart_switch_tex"
      />
    </v-col>
    <v-col cols="3">
      <v-btn
        v-if="!smart_ordering"
        color="primary"
        target="_blank"
        variant="flat"
        icon="mdi-content-save"
        @click="saveLayout"
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
      :is-draggable="!isMobile"
      :is-resizable="!isMobile"
      :responsive="responsive"
      @breakpoint-changed="onBreakpointChanged"
    >
      <template #item="{ item }">
        <DashboardElementWrapper
          :chart-configuration="chart_map[item.i]"
          :chart-title="title_map[item.i]"
          @remove="onChartRemove(item.i)"
          @edit="onChartEdit(item.i)"
          @switchPredict="(predict) => onChartPredict(item.i, predict)"
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
      kpi_map: {} as { [key: number]: { kpis_id: string[], chart_type: string } },
      chart_map: {} as { [key: number]: ChartConfiguration },
      title_map: {} as { [key: number]: string },
      dialogOpen: false,
      dialogModel: {
        chart_type: null,
        kpis: [],
      } as KpiReportElement,
      editing: -1,
      default_chart_options: {
        responsive: true,
        maintainAspectRatio: false
      } as any,
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
        this.chart_map[layout_id] = (await this.getChart(this.dialogModel.kpis, this.dialogModel.chart_type))
        this.kpi_map[layout_id] = {
          kpis_id: this.dialogModel.kpis,
          chart_type: this.chart_map[layout_id].type
        };
        this.title_map[layout_id] = this.getChartTitle(this.kpi_map[layout_id].kpis_id);
        this.editing = -1;
      } else {
        layout_id = ++this.last_used_index;
        await this.addChart(layout_id, this.dialogModel.kpis, this.dialogModel.chart_type);
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
      const kpis_id = this.kpi_map[layout_id].kpis_id;
      const chart = this.chart_map[layout_id];
      this.dialogModel = {
        kpis: kpis_id,
        chart_type: chart.type as ChartType,
      };
      this.dialogOpen = true;
    },

    async onChartPredict(layout_it: number, predict: boolean) {
      const chart_type = this.chart_map[layout_it].type;
      const kpis_id = this.kpi_map[layout_it].kpis_id;
      if(chart_type !== "line" || kpis_id.length != 1)
      {
        return;
      }
      this.chart_map[layout_it] = await this.getChart(kpis_id, chart_type, predict);
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

        let saved_layout = id_and_layout.layout;
        if (Object.keys(saved_layout).length == 0 || saved_layout.layout.length == 0) {
          throw new Error("empty layout");
        }

        const test = saved_layout.layout.map((l: LayoutItem) => l.i);
        this.last_used_index = Math.max(...test);
        this.layout = saved_layout.layout;
        this.kpi_map = saved_layout.kpi_map;
        for (const [key, value] of Object.entries(this.kpi_map)) {
          this.title_map[parseInt(key)] = this.getChartTitle(value.kpis_id);
        }
        const chart_promise = {} as { [key: number]: Promise<ChartConfiguration> };

        for (const layout_id in this.kpi_map)
        {
          chart_promise[layout_id] = this.getChart(this.kpi_map[layout_id].kpis_id, this.kpi_map[layout_id].chart_type as ChartType);
        }
        Object.keys(this.kpi_map).forEach(async (layout_id) => this.chart_map[parseInt(layout_id)] = await chart_promise[parseInt(layout_id)])
      } catch (error) {
        console.log(error)
        await this.getDefaultLayout();
      }
    },

    async addChart(layout_id: number, kpis_id: string[], chart_type: ChartType | null) {
      this.layout.push({x: this.layout.length * 2 % 4, y: this.layout.length + 1, w: 2, h: 1, i: layout_id});
      this.chart_map[layout_id] = (await this.getChart(kpis_id, chart_type));
      this.kpi_map[layout_id] = {
        kpis_id: kpis_id,
        chart_type: this.chart_map[layout_id].type
      };
      this.title_map[layout_id] = this.getChartTitle(this.kpi_map[layout_id].kpis_id);
    },

    clearDialogModel() {
      this.editing = -1;
      this.dialogModel = {
        chart_type: null,
        kpis: [],
      } as KpiReportElement;
    },

    async getChart(kpis_id: string[], type: ChartType | null, predict: boolean = false) {
      if (!type) {
        type = this.mainStore.getKpisAllowedCharts(kpis_id)[0];
      }

      let chart_data = (await this.axios.get(`/kpi-data/?kpis=${kpis_id}&user_type=${this.user_type}&chart_type=${type}&predict=${predict}`)).data["data"];

      let chart_option = this.default_chart_options;
      chart_option["plugins"] = {
        title: {
          display: true,
          text: this.getChartTitle(kpis_id)
        }
      }
      return {
        data: chart_data,
        options: chart_option,
        type: type
      } as ChartConfiguration;
    },

     async getDefaultLayout() {
       for (let i=0; i < this.mainStore.kpis.length; i++)
       {
         const new_index = ++this.last_used_index;
         await this.addChart(new_index, [this.mainStore.kpis[i].id], null);
       }
    },

    orderLayout() {
      this.old_layout = this.layout
      const orderedKpi = this.mainStore.kpis.sort((a: any, b: any) => {
        if (a.priority < b.priority) { return -1 }
        if (a.priority > b.priority) {return 1}
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

        const id = (await this.axios.get(`/dashboard-layout/?user_type=${this.user_type}&display=${this.current_breakpoint}`)).data[0]?.id ?? -1;

        if (id == -1) {
          await this.axios.post(`/dashboard-layout/`, {user_type: this.user_type, layout: saved_layout, display: this.current_breakpoint});
          const id_and_layout = (await this.axios.get(`/dashboard-layout/?user_type=${this.user_type}&display=${this.current_breakpoint}`)).data[0];
        }
        else {
          await this.axios.put(`/dashboard-layout/${id}/`, {user_type: this.user_type, layout: saved_layout, display: this.current_breakpoint})
        }
    },

    getChartTitle(kpi_ids: string[]){
      const kpi_names = kpi_ids.map((id) => this.mainStore.getKpiById(id)?.kb_name);
      let title: string = "";
      kpi_names.forEach((name) => {
        title += " / " + name;
      })
      return title.slice(3);
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
    isMobile() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },
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
