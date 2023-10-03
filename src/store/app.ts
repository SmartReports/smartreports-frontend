// Utilities
import { defineStore } from "pinia";
import { Kpi } from "../models";

export const useMainStore = defineStore("main", {
  state: () => ({
    kpi: [] as Kpi[],
  }),
  getters: {
    getKpiById: (state) => (id: string) =>
      state.kpi.find((kpi) => kpi.id == id),
  },
  actions: {
    async getKpi() {
      this.kpi = [
        {
          id: "id1",
          name: "Production Cycle Time",
          description: "KPI 1 description",
          allowed_charts: ["bar", "line"],
        },
        {
          id: "id2",
          name: "Energy Efficiency",
          description: "KPI 2 description",
          allowed_charts: ["bar", "line", "pie"],
        },
        {
          id: "id3",
          name: "Maintenance Downtime vs. Equipment Age",
          description: "KPI 3 description",
          allowed_charts: ["scatter"],
        },
        {
          id: "id4",
          name: "Quality First Pass Yield",
          description: "KPI 4 description",
          allowed_charts: ["bar", "line", "pie", "scatter"],
        },
        {
          id: "id5",
          name: "Overall Equipment Effectiveness",
          description: "KPI 5 description",
          allowed_charts: ["bar", "line"],
        },
      ];
    },
  },
});
