<template>
        <v-row>
          <v-col>
              <v-switch v-model="resizable" label="Resizable"/>
          </v-col>
          <v-col>
            <v-switch v-model="responsive" label="Responsive"/>
          </v-col>
          <v-col>
            <v-switch v-model="draggable" :false-value="true" :true-value="false" :label="smart_switch_tex"/>
          </v-col>
        </v-row>
        <br />
        <div style="margin-top: 10px">
          <GridLayout
            v-model:layout="layout"
            :col-num="4"
            :cols = '{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }'
            :row-height="250"
            :is-draggable="draggable"
            :is-resizable="resizable"
            :responsive="responsive"
          >
            <template #item="{ item }">
              <DashboardElement
                :chart-configuration="test_chart"
              />
            </template>
          </GridLayout>
        </div>
</template>

<script lang="ts">
import DashboardElement from "@/components/DashboardElement.vue";
import {ref, reactive, defineComponent} from 'vue'
import {ChartConfiguration} from "chart.js";

export default defineComponent({
  name: "Dashboard",
  props: {},
  data() {
    return {
      draggable: true,
      resizable: true,
      responsive: true,
      layout: reactive([
        { x: 0, y: 0, w: 2, h: 1, i: '0' },
        { x: 2, y: 0, w: 2, h: 1, i: '1' },
        { x: 0, y: 2, w: 2, h: 1, i: '2' },
        { x: 2, y: 2, w: 2, h: 1, i: '3' },
      ]),
      test_chart: {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March'],
          datasets: [{ data: [40, 20, 12],
                       backgroundColor: ["red", "green", "blue"],}]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      } as ChartConfiguration,
    //   can be improved, but I don't know how to use typescript
    };
  },
  methods: {},
  computed: {
    smart_switch_tex() {
      return this.draggable ? "Custom" : "Smart";
    }
  },
  components: { DashboardElement },
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
