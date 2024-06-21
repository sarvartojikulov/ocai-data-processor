import { arrayToChunks } from "./utils";

function parse(state : string, data : Record<string, string>[]) {
    const filtered = data.map((item) => {
        const response = Object.entries(item)
            .filter(([key]) => key.includes(state))
            .map(([_key, value]) => Number(value));

        return arrayToChunks(response);
    });
    return filtered;
}

export { parse };
