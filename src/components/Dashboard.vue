<template>
    <v-container class="rounded-xl px-16 my-8 pb-10 bg-white">
      <v-row>
        <v-col>
          <v-btn
            color="primary"
            target="_blank"
            variant="flat"
            @click="clearDialogModel()"
          >
            <v-icon icon="mdi-plus"/>
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
          <v-switch v-model="draggable" :false-value="true" :true-value="false" :label="smart_switch_tex"/>
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
        >
          <template #item="{ item }">
            <DashboardElement
              :chart-configuration="item.chart"
              @remove="onChartRemove(item.i)"
              @edit="onChartEdit(item.i)"
            />
          </template>
        </GridLayout>
      </div>
    </v-container>
</template>

<script lang="ts">
import DashboardElement from "@/components/DashboardElement.vue";
import {reactive, defineComponent, ref} from 'vue'
import {test_chart1, test_chart2, test_chart3, test_chart4} from "./test_charts";
import {Doughnut} from "vue-chartjs";
import DashboardDialog from "@/components/DashboardDialog.vue";
import {ChartType, KpiReportElement} from "@/models";
import {mapStores} from "pinia";
import {useMainStore} from "@/store/app";


export default defineComponent({
  name: "Dashboard",
  async created() {
    await this.mainStore.getKpi();
  },
  props: {},
  data() {
    return {
      draggable: true,
      resizable: true,
      responsive: true,
      breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
      cols: { lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 },
      colNum: 1,
      lastIndex: 3,
      layout: reactive([
        { x: 0, y: 0, w: 2, h: 1, i: '0', chart: test_chart1, kpi: "id1" },
        { x: 2, y: 0, w: 2, h: 1, i: '1', chart: test_chart2, kpi: "id2"},
        { x: 0, y: 2, w: 2, h: 1, i: '2', chart: test_chart3, kpi: "id3"},
        { x: 2, y: 2, w: 2, h: 1, i: '3', chart: test_chart4, kpi: "id4"},
      ]),
      dialogOpen: false,
      dialogModel: {
        chart_type: null,
        kpi: "",
      } as KpiReportElement,
      editing: ""
    };
  },
  methods: {
    onAddChart() {
      if(this.editing){
        // backend call
      } else {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 2,
          h: 1,
          i: `${++this.lastIndex}`,
          chart: test_chart1,
          kpi: "id1"
        })
      }

    },
    onChartRemove(id: string) {
      const index = this.layout.findIndex(item => item.i === id)

      if (index > -1) {
        this.layout.splice(index, 1)
      }
    },
    onChartEdit(id: string) {
      this.editing = id;
      const chart = this.layout.find(item => item.i === id);
      if (chart) {
        this.dialogModel = {
          kpi: chart.kpi,
          chart_type: chart.chart.type as ChartType
        };
      }
      this.dialogOpen = true
    },
    onUpdateDialogModel(value: any) {
      this.dialogModel = value;
    },
    onUpdateDialogOpen(value: boolean) {
      this.dialogOpen = value;
    },
    clearDialogModel() {
      this.dialogModel = {
        chart_type: null,
        kpi: "",
      } as KpiReportElement
    }
  },
  computed: {
    ...mapStores(useMainStore),
    smart_switch_tex() {
      return this.draggable ? "Custom ordering" : "Smart ordering";
    }
  },
  components: {DashboardDialog, Doughnut, DashboardElement },
});

</script>

<style scoped>
.vgl-layout {
  background-color: white;
  --vgl-placeholder-bg: rgb(128, 128, 128);
  --vgl-placeholder-opacity: 10%;
  border-radius: 15px;

}

:deep(.vgl-item--placeholder) {
  border-radius: 40px;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
  border: 1px solid white;
  border-radius: 40px;
}

:deep(.vgl-item--resizing) {
  opacity: 30%;
  border-radius: 15px;
}

:deep(.vgl-item--static) {
  background-color: white;
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
