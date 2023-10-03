export interface ReportTemplate {
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "quarterly";
  pages: ReportTemplatePage[];
}

export interface ReportTemplatePage {
  layout: "horizontal" | "vertical" | "grid";
  elements: KpiReportElement[];
}

export interface KpiReportElement {
  kpi: string;
  chart_type: ChartType;
  chart_data: object;
}

export type ChartType = "line" | "bar" | "pie" | "bubble" | "scatter";
