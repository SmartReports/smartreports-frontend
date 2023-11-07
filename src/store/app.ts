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
          id: "1",
          name: "Production Cycle Time",
          description: "KPI 1 description",
          allowed_charts: ["bar", "line"],
        },
        {
          id: "2",
          name: "Energy Efficiency",
          description: "KPI 2 description",
          allowed_charts: ["bar", "line", "pie"],
        },
        {
          id: "3",
          name: "Maintenance Downtime vs. Equipment Age",
          description: "KPI 3 description",
          allowed_charts: ["scatter"],
        },
        {
          id: "4",
          name: "Quality First Pass Yield",
          description: "KPI 4 description",
          allowed_charts: ["bar", "line", "pie", "scatter"],
        },
        {
          id: "5",
          name: "Overall Equipment Effectiveness",
          description: "KPI 5 description",
          allowed_charts: ["bar", "line"],
        },
      ];
    },
  },
});
