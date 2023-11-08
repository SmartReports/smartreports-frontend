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
      this.kpi = (await axios.get("/kpi-list/")).data
    },
  },
});
