import {ChartData, ChartOptions} from "chart.js";

export type BarChartData = ChartData<"bar", (number | [number, number] | null)[]>
export type DoughnutChartData = ChartData<"doughnut", number[], unknown>
export type PieChartData = ChartData<"pie", number[], unknown>
export type LineChartData = ChartData<"line", (number | import("chart.js").Point | null)[], unknown>;
export type RadarChartData = ChartData<"radar", (number | null)[], unknown>;

export type BarChartOption = ChartOptions<"bar">
export type RadarChartOption = ChartOptions<"radar">
