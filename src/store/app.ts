// Utilities
import { defineStore } from "pinia";
import { Kpi, Alarms, Account } from "../models";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    alarms: [] as Alarms[],
    kpi: [] as Kpi[],
    currentAccount: {
      name: "Caterina",
      employment: "Machine Maintainer",
      value: "machine_maintainer",
      image: new URL(`../assets/Caterina.png`, import.meta.url).href,
    } as Account,
    accounts: [
      {
        name: "Francesco",
        employment: "Production Engineer",
        value: "project_manager",
        image:
          "https://www.nahb.org/-/media/NAHB/education-and-events/images/designations/designations-cmp-500x500.jpg?h=500&w=500&la=en&hash=7FF6FBC0A5C3FA87869D099A0079E670",
      },
      {
        name: "Sandra",
        employment: "Parent",
        value: "parent",
        image:
          "https://www.scopeaust.org.au/uploads/main/Disability-Services/physiotherapy-small.jpg",
      },
      {
        name: "Rodolfo",
        employment: "Doctor",
        value: "doctor",
        image: "https://emis.health/wp-content/uploads/2023/07/Doctor-10.jpg",
      },
    ],
  }),
  getters: {
    getKpiById: (state) => (id: string) =>
      state.kpi.find((kpi) => kpi.id == id),
    getAlarmById: (state) => (id: string) =>
      state.alarms.find((alarm) => alarm.id == id),
    // Get kpi that don't have alarms setted
    getKpiWithoutAlarms: (state) => {
      const kpiWithoutAlarms = state.kpi.filter((kpi) => {
        const hasMatchingAlarms = state.alarms.some(
          (alarm) => alarm.kpi == kpi.id
        );
        return !hasMatchingAlarms;
      });
      return kpiWithoutAlarms;
    },
  },
  actions: {
    async getKpi(accountId: any) {
      // If accountId is undefined accountId = ''
      const account = accountId === undefined ? "" : accountId;

      this.kpi = (await axios.get(`/kpi-list/?user_type=${account}`)).data;
    },
    async getAlarms(accountId: any) {
      this.alarms = (
        await axios.get(`/alarms-list/?user_type=${accountId}`)
      ).data;
    },
  },
});
