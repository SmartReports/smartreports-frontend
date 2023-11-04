<template>
    <v-container class="rounded-xl px-16 my-8 pb-10 bg-white">
      <v-row>
        <v-col>
          <v-menu>

          </v-menu>
          <v-btn
            color="primary"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-plus"/>
            Add Chart
            <DashboardDialog/>
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
          :cols = '{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }'
          :row-height="250"
          :is-draggable="draggable"
          :is-resizable="resizable"
          :responsive="responsive"
        >
          <template #item="{ item }">
            <DashboardElement
              :chart-configuration="item.chart"
              @remove="onChartRemove(item.i)"
            />
          </template>
        </GridLayout>
      </div>
    </v-container>
</template>

<script lang="ts">
import DashboardElement from "@/components/DashboardElement.vue";
import {reactive, defineComponent} from 'vue'
import {test_chart1, test_chart2, test_chart3, test_chart4} from "./test_charts";
import {Doughnut} from "vue-chartjs";
import DashboardDialog from "@/components/DashboardDialog.vue";

export default defineComponent({
  name: "Dashboard",
  props: {},
  data() {
    return {
      draggable: true,
      resizable: true,
      responsive: true,
      colNum: 4,
      lastIndex: 3,
      layout: reactive([
        { x: 0, y: 0, w: 2, h: 1, i: '0', chart: test_chart1 },
        { x: 2, y: 0, w: 2, h: 1, i: '1', chart: test_chart2 },
        { x: 0, y: 2, w: 2, h: 1, i: '2', chart: test_chart3 },
        { x: 2, y: 2, w: 2, h: 1, i: '3', chart: test_chart4 },
      ]),
    };
  },
  methods: {
    onAddChart() {
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum || 12),
        y: this.layout.length + (this.colNum || 12), // puts it at the bottom
        w: 2,
        h: 1,
        i: `${++this.lastIndex}`,
        chart: test_chart1
      })
    },
    onChartRemove(id: string) {
      const index = this.layout.findIndex(item => item.i === id)

      if (index > -1) {
        this.layout.splice(index, 1)
      }
    }
  },
  computed: {
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
  --vgl-placeholder-bg: gray;
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
