import { arrayToChunks } from "./utils.js";

const FILTER_KEYS = { IST: "[Ist-Zustand]", SOLL: "[Soll-Zustand]" };

function parse(state, data) {
    const filtered = data.map((item) => {
        const response = Object.entries(item)
            .filter(([key]) => key.includes(state))
            .map(([key, value]) => Number(value));

        return arrayToChunks(response);
    });
    return filtered
}

export { parse, FILTER_KEYS };
