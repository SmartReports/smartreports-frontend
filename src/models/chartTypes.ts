import {ChartData, ChartOptions} from "chart.js";

export type BarChartData = ChartData<"bar", (number | [number, number] | null)[]>
export type DoughnutChartData = ChartData<"doughnut", number[]>
export type PieChartData = ChartData<"pie", number[]>
export type LineChartData = ChartData<"line", (number | import("chart.js").Point | null)[]>;
export type RadarChartData = ChartData<"radar", (number | null)[]>;

export type BarChartOption = ChartOptions<"bar">
export type DoughnutChartOption = ChartOptions<"doughnut">
export type PieChartOption = ChartOptions<"pie">
export type LineChartOption = ChartOptions<"line">
export type RadarChartOption = ChartOptions<"radar">
export type PieChartOption = ChartOptions<"pie">
export type LineChartOption = ChartOptions<"line">
export type DoughnutChartOption = ChartOptions<"doughnut">
