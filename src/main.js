import process_data from "./processor/index.js";
import { parse, FILTER_KEYS } from "./processor/parser.js";
import validate from "./processor/validation.js";

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
