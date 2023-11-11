export interface ReportTemplate {
  id?: string | number;
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "quarterly";
  pages: ReportTemplatePage[];
}

export interface ReportTemplatePage {
  id?: string | number;
  layout: "horizontal" | "vertical" | "grid";
  elements: KpiReportElement[];
}

export interface KpiReportElement {
  kpi: string;
  chart_type: ChartType | null;
}

export type ChartType = "line" | "bar" | "pie" | "doughnut" | "radar";
