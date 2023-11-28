// Utilities
import { defineStore } from "pinia";
import { Kpi, Alarms, Account, ReportTemplate, ReportImage } from "../models";
import axios from "axios";
import {ChartType} from "chart.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    currentModelValue: {} as ReportTemplate,
    alarms: [] as Alarms[],
    kpis: [] as Kpi[],
    user_reports: [] as ReportTemplate[],
    user_suggested_reports: [] as ReportTemplate[],
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
      state.kpis.find((kpi) => kpi.id == id),
    getKpisAllowedCharts: (state) => (ids: string[]) =>
    {
      const selectedKpis = ids.map((kpi_id: any) => state.kpis.find((kpi) => kpi.id == kpi_id));
      // Ensure that there are selected KPIs
      if (selectedKpis.length > 0) {
        // Find the intersection of allowed chart types for selected KPIs
        const intersection = selectedKpis.reduce((commonChartTypes: any, kpi) => {
          const kpiChartTypes = kpi?.allowed_charts || [];
          return commonChartTypes.length === 0
            ? kpiChartTypes
            : commonChartTypes.filter((chartType: any) => kpiChartTypes.includes(chartType));
        }, [] as ChartType[]); // Provide an explicit type for the initial value

        return intersection;
      } else {
        return [];
      }
    },
    getAlarmById: (state) => (id: string) =>
      state.alarms.find((alarm) => alarm.id == id),
    // Get kpi that don't have alarms setted
    getKpiWithoutAlarms: (state) => {
      const kpiWithoutAlarms = state.kpis.filter((kpi) => {
        const hasMatchingAlarms = state.alarms.some(
          (alarm) => alarm.kpi == kpi.id
        );
        return !hasMatchingAlarms;
      });
      return kpiWithoutAlarms;
    },
  },
  actions: {
    getCurrentModelValue() {
      return this.currentModelValue
    },
    setCurrentModelValue(value: ReportTemplate) {
      this.currentModelValue = value
    },
    async getKpi(accountId: any) {
      // If accountId is undefined accountId = ''
      const account = accountId === undefined ? "" : accountId;

      this.kpis = (await axios.get(`/kpi-list/?user_type=${account}`)).data;
    },
    async getReports(accountId: any) {
      // If accountId is undefined accountId = ''
      const account = accountId === undefined ? "" : accountId;

      this.user_reports = (await axios.get(`/report-templates/?user_type=${account}`)).data as ReportTemplate[];
      let images = (await axios.get(`/report-img/?user_type=${account}`)).data as ReportImage[];

      this.user_reports.forEach(report => {
        report.img = images.filter(img => img.report_id == report.id)[0]?.img
      })
      console.log(this.user_reports)
    },
    async getSuggestedReports(accountId: any) {
      this.user_suggested_reports = (
        await axios.get(`/smart-reports/?user_type=${accountId}`)
      ).data as ReportTemplate[];
    },
    async getAlarms(accountId: any) {
      this.alarms = (
        await axios.get(`/alarms-list/?user_type=${accountId}`)
      ).data;
    },
    async removeReport(id: number | string) {
      this.user_reports = this.user_reports.filter((report) => report.id != id);
      await axios.delete(`/report-templates/${id}/`);
    },
    async saveScreen(report_id: number | string | undefined, imgScreen: string){
      await axios.post(`/report-img/`, {
        report_id: report_id,
        img: imgScreen,
        user_type: this.currentAccount.value,
      });
      this.user_reports.filter((report) => {report_id==report.id})[0].img=imgScreen
    },
  },
});
