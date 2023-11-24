import { ChartType } from "./reports";

export interface Kpi {
  id: string;
  kb_name: string;
//  description: string;
  allowed_charts: ChartType[];
}
