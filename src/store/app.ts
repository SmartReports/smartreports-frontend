// Utilities
import { defineStore } from "pinia";
import { Kpi, Alarms } from "../models";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    alarms: [] as Alarms[],
    kpi: [] as Kpi[],
  }),
  getters: {
    getKpiById: (state) => (id: string) =>
      state.kpi.find((kpi) => kpi.id == id),
    getAlarmById: (state) => (id: string) =>
      state.alarms.find((alarm) => alarm.id == id),
    // Get kpi that don't have alarms setted
    getKpiWithoutAlarms: (state) => {
      console.log("KPI data:", state.kpi);
      console.log("Alarms data:", state.alarms);

      const kpiWithoutAlarms = state.kpi.filter((kpi) => {
        const hasMatchingAlarms = state.alarms.some((alarm) => alarm.kpi === kpi.id);
        console.log(`KPI ${kpi.id} has matching alarms: ${hasMatchingAlarms}`);
        return !hasMatchingAlarms;
      });

      console.log("KPIs without matching alarms:", kpiWithoutAlarms);
      return kpiWithoutAlarms;
    },
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
    async getAlarms(accountId: any) {
      this.alarms = (await axios.get(`/alarms-list/?user_type=${accountId}`)).data
    }
  },
});
