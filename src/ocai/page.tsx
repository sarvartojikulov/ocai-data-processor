import React, { useState } from "react";
import FileInput from "../components/FileInput";
import { parse } from "./processor/parser";
import { FILTER_KEYS } from "./processor/constants";
import { parseJsonFile } from "../utils";
import process_data from "./processor";
import validate from "./processor/validation";
import OcaiTable from "./OcaiTable";
import OcaiChart from "./OcaiChart";

const OcaiPage = () => {
    const [results, setResults] = useState<{
        ist: number[];
        soll: number[];
    } | null>(null);

    const onInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        const data = await parseJsonFile<{
            responses: Record<string, string>[];
        }>(file);
        data;

        const ist = parse(FILTER_KEYS.IST, data.responses);
        const soll = parse(FILTER_KEYS.SOLL, data.responses);

        if (!validate(ist) || !validate(soll)) {
            // shaw warning
            return;
        }

        const ist_result = process_data(ist);
        const soll_result = process_data(soll);

        setResults({ ist: ist_result, soll: soll_result });
    };

    return (
        <React.Fragment>
            <FileInput label="ONLY JSON FROM LIMESURVEY EXPORT" accept="application/JSON" onInput={onInput} />

            {results?.ist && results.soll && (
                <div className="max-w-5xl mx-auto">
                    <React.Fragment>
                        <OcaiTable {...results} />
                        <OcaiChart {...results} />
                    </React.Fragment>
                </div>
            )}
        </React.Fragment>
    );
};

export default OcaiPage;
