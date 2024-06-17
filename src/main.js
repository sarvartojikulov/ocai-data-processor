import process_data from "./processor/index.js";
import { parse, FILTER_KEYS } from "./processor/parser.js";
import validate from "./processor/validation.js";

let chartInstance = null;

const input_element = document.querySelector("#dropzone-file");

input_element.addEventListener("change", async (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    const data = await parseJsonFile(file);

    const ist = parse(FILTER_KEYS.IST, data.responses);
    const soll = parse(FILTER_KEYS.SOLL, data.responses);

    if (!validate(ist) || !validate(soll)) {
        showWarning("data is invalid");
        return;
    }

    const ist_result = process_data(ist);
    const soll_result = process_data(soll);

    console.log(ist_result, soll_result);
    showData(ist_result, soll_result);
    updateChart(ist_result, soll_result);
});

function showWarning(text) {
    console.log(text);
}

async function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (event) => resolve(JSON.parse(event.target.result));
        fileReader.onerror = (error) => reject(error);
        fileReader.readAsText(file);
    });
}

function showData(ist, soll) {
    const tableElement = document.querySelector("#table-container");

    const body = tableElement.querySelector("tbody");

    const ist_row = createRow(ist, "IST");
    const soll_row = createRow(soll, "SOLL");

    body.appendChild(ist_row);
    body.appendChild(soll_row);

    tableElement.classList.remove("hidden");
}

function createRow(data, type) {
    const row = document.createElement("tr");
    const label = document.createElement("th");
    label.textContent = type;
    row.append(label);
    data.forEach((num) => {
        const el = document.createElement("td");
        el.textContent = num.toFixed(2);
        row.append(el);
    });

    return row;
}

function updateChart(ist, soll) {
    const ctx = document.getElementById('myChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Clan (A)',
                'Adhocracy (B)',
                'Market (C)',
                'Hierarchy (D)'
            ],
            datasets: [
                {
                    label: 'Ist-Zustand',
                    data: ist,
                    borderWidth: 2,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'transparent'
                },
                {
                    label: 'Soll-Zustand',
                    data: soll,
                    borderWidth: 1,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'transparent'
                }
            ]
        },
        options: {
            scales: {
                
                r: {
                    beginAtZero: true,
                    min: 0,
                    max: 50,
                    ticks: {
                        stepSize: 10
                    },
                    pointLabels: {
                        display: true, // label
                        font: {
                            size: 14
                        }
                    },
                    grid: {
                        circular: false, // quadratisch
                        color: 'rgb(57, 46, 67)'
                    },
                    angleLines: {
                        display: true, // achsen
                        color: 'rgb(57, 46, 67)'
                    },
                    startAngle: -45
                },
            }
        }
    });
}
