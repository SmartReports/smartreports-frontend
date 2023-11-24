export interface ReportTemplate {
  id?: string | number;
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "quarterly";
  pages: ReportTemplatePage[];
  img?: string;
}

export interface ReportImage {
  id?: string | number;
  report_id: string | number;
  user_type: string;
  img: string;
}

export interface ReportTemplatePage {
  id?: string | number;
  layout: "horizontal" | "vertical" | "grid";
  elements: KpiReportElement[];
}

export interface KpiReportElement {
  kpis: string[];
  chart_type: ChartType | null;
}

export type ChartType = "line" | "bar" | "pie" | "doughnut" | "radar" | "scatter";
