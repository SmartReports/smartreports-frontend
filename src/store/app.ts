// Utilities
import { defineStore } from "pinia";
import { Kpi } from "../models";
import axios from "axios";

const dev = process.env.NODE_ENV !== "production";
axios.defaults.baseURL = dev ? process.env.VUE_APP_AXIOS_BASE ??
  "http://127.0.0.1:8000" :
  "https://paulmagos.pythonanywhere.com/smartreport_app/";

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
      // this.kpi = (await axios.get("/kpi-list/")).data
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
