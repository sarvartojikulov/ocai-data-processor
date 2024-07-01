import {
  Chart,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
} from "chart.js";
import { FC, useEffect } from "react";
import "./OcaiChart.css";

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement);

type OcaiChartProps = {
  applicantResults: number[];
  ocaiResults: number[] | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let chartInstance: any = null;

const OcaiChart: FC<OcaiChartProps> = ({ applicantResults, ocaiResults }) => {
  useEffect(() => {
    const ctx = document.getElementById("ocai-chart") as HTMLCanvasElement;

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "radar",
      data: {
        labels: ["Clan (A)", "Adhocracy (B)", "Market (C)", "Hierarchy (D)"],
        datasets: [
          {
            label: "Bewerber-Zustand",
            data: applicantResults,
            borderWidth: 4,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "transparent",
          },
          {
            label: "OCAI Zustand",
            data: ocaiResults,
            borderWidth: 3,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "transparent",
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 50,
            ticks: {
              stepSize: 10,
            },
            pointLabels: {
              display: true,
              font: {
                size: 14,
              },
            },
            grid: {
              circular: false,
              color: "rgba(227, 229, 239, 0.8)",
            },
            angleLines: {
              display: true,
              color: "rgba(227, 229, 239, 0.8)",
            },
            startAngle: -45,
          },
        },
      },
    });
  }, [applicantResults, ocaiResults]);

  return (
    <div className="mt-12">
      <div id="chart-labels">
      <h1 className="font-bold text-xl"> Chart - OCAI </h1>
      <h3> Bewerber Blau - Wunschzustand Rot </h3>
        <canvas id="ocai-chart"></canvas>
        <span id="top-label">Flexibility and Discretion</span>
        <span id="right-label">External Focus and Differentation</span>
        <span id="bottom-label">Stability and Control</span>
        <span id="left-label">Internal Focus and Integration</span>
      </div>
    </div>
  );
};

export default OcaiChart;
