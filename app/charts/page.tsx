// import { ChartComponent, CustomPieChart } from "@/components/custom/pie-chart";

import { ChartComponent } from "@/components/custom/pie-chart";

export default function ChartPage () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Chart Page</h1>
      <p>This is the chart page.</p>
    <ChartComponent />

    </div>
  );
}