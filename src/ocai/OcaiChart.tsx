import {
    Chart,
    LineElement,
    PointElement,
    RadarController,
    RadialLinearScale,
} from "chart.js";
import { FC, useEffect } from "react";
import "./OcaiChart.css"

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement);

type OcaiChartProps = {
    ist: number[];
    soll: number[];
};
let chartInstance : any = null;

const OcaiChart: FC<OcaiChartProps> = ({ ist, soll }) => {
    useEffect(() => {
        const ctx = document.getElementById("ocai-chart") as HTMLCanvasElement;

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: "radar",
            data: {
                labels: [
                    "Clan (A)",
                    "Adhocracy (B)",
                    "Market (C)",
                    "Hierarchy (D)",
                ],
                datasets: [
                    {
                        label: "Ist-Zustand",
                        data: ist,
                        borderWidth: 2,
                        borderColor: "rgba(54, 162, 235, 1)",
                        backgroundColor: "transparent",
                    },
                    {
                        label: "Soll-Zustand",
                        data: soll,
                        borderWidth: 1,
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
                            display: true, // label
                            font: {
                                size: 14,
                            },
                        },
                        grid: {
                            circular: false, // quadratisch
                            color: "rgb(57, 46, 67)",
                        },
                        angleLines: {
                            display: true, // achsen
                            color: "rgb(57, 46, 67)",
                        },
                        startAngle: -45,
                    },
                },
            },
        });
    }, []);

    return (
        <div className="mt-12">
            <div id="chart-labels">
                <h1 className="font-bold text-xl"> Chart - OCAI </h1>
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
