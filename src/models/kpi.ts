import { ChartType } from "./reports";

export interface Kpi {
  id: string;
  name: string;
  description: string;
  allowed_charts: ChartType[];
}
