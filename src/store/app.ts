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
          name: "KPI 1",
          description: "KPI 1 description",
          allowed_charts: ["bar", "line", "pie", "scatter"],
        },
        {
          id: "id2",
          name: "KPI 2",
          description: "KPI 2 description",
          allowed_charts: ["bar", "line", "pie"],
        },
        {
          id: "id3",
          name: "KPI 3",
          description: "KPI 3 description",
          allowed_charts: ["scatter"],
        },
      ];
    },
  },
});
